import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet, TrendingUp, TrendingDown, Target, Plus,
  Lightbulb, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, Legend
} from 'recharts';
import { useApp } from '../context/AppContext';
import { dashboardApi } from '../services/api';
import { categories, insights } from '../data/mockData';
import SummaryCard from '../components/ui/SummaryCard';
import CategoryBadge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const fmt = (n, currency = 'Rs.') => `${currency} ${n.toLocaleString('en-IN')}`;

function InsightCard({ insight }) {
  const styles = {
    positive: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-400' },
    warning: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-700', dot: 'bg-amber-400' },
    info: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', dot: 'bg-blue-400' },
  };
  const s = styles[insight.type];
  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-xl border ${s.bg} ${s.border}`}>
      <div className={`w-2 h-2 rounded-full ${s.dot} mt-1.5 flex-shrink-0`} />
      <p className={`text-sm ${s.text}`}>{insight.text}</p>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#e8e9ef] rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-[#1a1a2e] mb-2">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: Rs. {p.value?.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const { user, transactions, currency, t } = useApp();
  const navigate = useNavigate();
  const [dashboardMetrics, setDashboardMetrics] = useState(null);
  const [monthlyOverview, setMonthlyOverview] = useState([]);
  const [categorySpendingData, setCategorySpendingData] = useState([]);

  useEffect(() => {
    dashboardApi.getSummary()
      .then((data) => {
        if (data) setDashboardMetrics(data);
      })
      .catch((err) => console.warn('Failed to load dashboard metrics from backend:', err));

    dashboardApi.getMonthlyOverview()
      .then((data) => {
        if (Array.isArray(data)) {
          setMonthlyOverview(data);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch monthly dashboard data:', err);
      });

    dashboardApi.getCategorySpending()
      .then((data) => {
        if (Array.isArray(data)) {
          const categoryMap = categories.reduce((acc, cat) => {
            acc[cat.id] = cat;
            return acc;
          }, {});

          const mapped = data.map((item) => {
            const catInfo = categoryMap[item.category] || { label: item.category, color: '#94a3b8' };
            return {
              name: catInfo.label,
              value: item.amount,
              color: catInfo.color,
            };
          });
          setCategorySpendingData(mapped);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch category spending data:', err);
      });
  }, [transactions]);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthTx = transactions.filter((t) => t.date && t.date.startsWith(currentMonth));
  const fallbackIncome = monthTx.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const fallbackExpenses = monthTx.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const safeNum = (val) => {
    const n = Number(val);
    return isNaN(n) || !isFinite(n) ? 0 : n;
  };

  const totalIncome = safeNum(dashboardMetrics?.totalIncome ?? fallbackIncome);
  const totalExpenses = safeNum(dashboardMetrics?.totalExpenses ?? fallbackExpenses);
  const balance = safeNum(dashboardMetrics?.totalBalance ?? (totalIncome - totalExpenses));

  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans]">
            {t('goodMorning')}, {user?.name ? user.name.split(' ')[0] : 'User'} 👋
          </h1>
          <p className="text-sm text-[#8a8a9a] mt-0.5">{dateStr}</p>
        </div>
        <Button onClick={() => navigate('/transactions/add')}>
          <Plus size={15} />
          {t('addExpense')}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title={t('totalBalance')} value={fmt(balance, currency)} icon={Wallet} accent />
        <SummaryCard title={t('totalIncome')} value={fmt(totalIncome, currency)} icon={TrendingUp} />
        <SummaryCard title={t('totalExpenses')} value={fmt(totalExpenses, currency)} icon={TrendingDown} />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Monthly overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-[#1a1a2e]">Monthly Overview</h2>
            <span className="text-xs text-[#8a8a9a] bg-[#f7f8fa] px-2.5 py-1 rounded-lg">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyOverview} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f5c518" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#f5c518" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e53935" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#e53935" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8a8a9a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8a8a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Income" stroke="#f5c518" strokeWidth={2} fill="url(#incomeGrad)" dot={false} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#e53935" strokeWidth={2} fill="url(#expGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
          <h2 className="font-semibold text-[#1a1a2e] mb-5">By Category</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categorySpendingData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                {categorySpendingData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `Rs. ${v.toLocaleString('en-IN')}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-3">
            {categorySpendingData.slice(0, 4).map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-[#4a4a5a]">{c.name}</span>
                </div>
                <span className="font-medium text-[#1a1a2e]">Rs. {c.value.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recent transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#1a1a2e]">Recent Transactions</h2>
            <button onClick={() => navigate('/transactions')} className="text-xs text-[#f5c518] font-medium hover:underline">
              View all
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {recent.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between py-2.5 border-b border-[#f0f1f5] last:border-0 hover:bg-[#fafafa] -mx-1 px-1 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                    {tx.type === 'income' ? <ArrowDownLeft size={16} className="text-emerald-600" /> : <ArrowUpRight size={16} className="text-red-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1a1a2e]">{tx.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <CategoryBadge categoryId={tx.category} />
                      <span className="text-xs text-[#b0b1bb]">{tx.date}</span>
                    </div>
                  </div>
                </div>
                <p className={`text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-600' : 'text-[#1a1a2e]'}`}>
                  {tx.type === 'income' ? '+' : '-'}{currency} {tx.amount.toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={17} className="text-[#f5c518]" />
            <h2 className="font-semibold text-[#1a1a2e]">Smart Insights</h2>
          </div>
          <div className="flex flex-col gap-3">
            {insights.map((i) => <InsightCard key={i.id} insight={i} />)}
          </div>
        </div>
      </div>

      {/* Spending comparison bar chart */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-semibold text-[#1a1a2e]">Income vs Expenses — Monthly Comparison</h2>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={monthlyOverview} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={4}>
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8a8a9a' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#8a8a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="income" name="Income" fill="#f5c518" radius={[6, 6, 0, 0]} maxBarSize={40} />
            <Bar dataKey="expenses" name="Expenses" fill="#1a1a2e" radius={[6, 6, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

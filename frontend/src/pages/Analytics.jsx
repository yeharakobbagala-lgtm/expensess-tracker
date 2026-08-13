import { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid
} from 'recharts';
import { useApp } from '../context/AppContext';
import { analyticsApi } from '../services/api';
import { categories } from '../data/mockData';

const ranges = [
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: '3months', label: 'Last 3 Months' },
  { value: 'year', label: 'This Year' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#e8e9ef] rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-[#1a1a2e] mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2" style={{ color: p.color || '#1a1a2e' }}>
          <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: p.color || '#f5c518' }} />
          {p.name}: Rs. {p.value?.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
};

export default function Analytics() {
  const [range, setRange] = useState('month');
  const [monthlyData, setMonthlyData] = useState([]);
  const [categorySpending, setCategorySpending] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const { transactions } = useApp();

  useEffect(() => {
    analyticsApi.get(range)
      .then((data) => {
        if (data) {
          if (Array.isArray(data.monthlyData)) setMonthlyData(data.monthlyData);
          if (Array.isArray(data.weeklyData)) setWeeklyData(data.weeklyData);
          if (Array.isArray(data.categorySpending)) {
            const categoryMap = categories.reduce((acc, cat) => {
              acc[cat.id] = cat;
              return acc;
            }, {});
            const mappedCats = data.categorySpending.map((c) => {
              const catInfo = categoryMap[c.name] || { label: c.name, color: c.color || '#94a3b8' };
              return {
                name: catInfo.label || c.name,
                value: c.value,
                color: c.color || catInfo.color || '#f5c518',
              };
            });
            setCategorySpending(mappedCats);
          }
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch analytics data:', err);
      });
  }, [range, transactions]);

  const trendData = monthlyData.map((m) => {
    const inc = m.income || 0;
    const exp = m.expenses || 0;
    const savings = inc - exp;
    const savingsRate = inc > 0 ? Math.max(0, Math.round((savings / inc) * 100)) : 0;
    return {
      ...m,
      savings,
      savingsRate,
    };
  });

  const totalCategoryVal = categorySpending.reduce((s, x) => s + (x.value || 0), 0);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans]">Analytics</h1>
          <p className="text-sm text-[#8a8a9a]">Deep dive into your financial patterns</p>
        </div>
        <div className="flex gap-1.5 p-1 bg-[#f0f1f5] rounded-xl">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${range === r.value ? 'bg-white shadow-sm text-[#1a1a2e]' : 'text-[#8a8a9a] hover:text-[#4a4a5a]'}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top row */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
          <h2 className="font-semibold text-[#1a1a2e] mb-5">Monthly Spending Trend</h2>
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f5c518" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f5c518" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8a8a9a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8a8a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f5c518" strokeWidth={2.5} fill="url(#a1)" dot={{ r: 4, fill: '#f5c518', strokeWidth: 2, stroke: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
          <h2 className="font-semibold text-[#1a1a2e] mb-5">Income vs Expenses</h2>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={monthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8a8a9a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8a8a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="Income" fill="#f5c518" radius={[6, 6, 0, 0]} maxBarSize={36} />
              <Bar dataKey="expenses" name="Expenses" fill="#1a1a2e" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Middle row */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
          <h2 className="font-semibold text-[#1a1a2e] mb-5">Savings Rate Trend</h2>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8a8a9a' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8a8a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="savingsRate" name="Savings %" stroke="#f5c518" strokeWidth={2.5} dot={{ r: 5, fill: '#f5c518', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
          <h2 className="font-semibold text-[#1a1a2e] mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categorySpending} cx="50%" cy="50%" outerRadius={65} dataKey="value" paddingAngle={2}>
                {categorySpending.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `Rs. ${v.toLocaleString('en-IN')}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 mt-3 max-h-40 overflow-y-auto">
            {categorySpending.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span className="text-[#4a4a5a] truncate">{c.name}</span>
                </div>
                <span className="font-medium text-[#1a1a2e] ml-2">
                  {totalCategoryVal > 0 ? Math.round(((c.value || 0) / totalCategoryVal) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly spending */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
        <h2 className="font-semibold text-[#1a1a2e] mb-5">Weekly Spending — This Month</h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f1f5" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#8a8a9a' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#8a8a9a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" name="Spending" fill="#f5c518" radius={[8, 8, 0, 0]} maxBarSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

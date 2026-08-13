import { useState } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { categories } from '../data/mockData';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { EmptyBudgetsIllustration } from '../components/illustrations/EmptyStateIllustrations';
import EmptyState from '../components/ui/EmptyState';

function BudgetCard({ budget, currency, onEdit, onDelete }) {
  const cat = categories.find((c) => c.id === budget.category) || { label: budget.category, color: '#94a3b8' };
  const spentVal = budget.spent ?? 0;
  const limitVal = budget.limit ?? 0;
  const pct = budget.percentageUsed !== undefined ? Math.min(budget.percentageUsed, 100) : (limitVal ? Math.min((spentVal / limitVal) * 100, 100) : 0);
  const remainingVal = budget.remaining !== undefined ? budget.remaining : (limitVal - spentVal);
  const isOver = spentVal > limitVal;
  const isWarn = pct > 80;

  return (
    <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}18` }}>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
          </div>
          <div>
            <p className="font-semibold text-[#1a1a2e]">{cat.label}</p>
            <p className="text-xs text-[#8a8a9a]">Monthly budget</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(budget)} className="p-1.5 rounded-lg hover:bg-[#f0f1f5] text-[#8a8a9a] hover:text-[#1a1a2e] transition-colors">
            <Edit2 size={14} />
          </button>
          <button onClick={() => onDelete(budget.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#8a8a9a] hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between mb-1.5">
          <span className="text-sm text-[#4a4a5a]">
            {currency} {spentVal.toLocaleString('en-IN')} spent
          </span>
          <span className="text-sm font-semibold text-[#1a1a2e]">
            {currency} {limitVal.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="h-2.5 bg-[#f0f1f5] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              backgroundColor: isOver ? '#e53935' : '#10b981',
            }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <div className="flex items-center gap-1.5">
            {(isOver || isWarn) && <AlertTriangle size={12} className={isOver ? 'text-red-500' : 'text-amber-500'} />}
            <span className={`text-xs font-medium ${isOver ? 'text-red-500' : isWarn ? 'text-amber-600' : 'text-[#8a8a9a]'}`}>
              {isOver ? 'Over budget!' : `${Math.round(pct)}% used`}
            </span>
          </div>
          <span className="text-xs text-[#8a8a9a]">
            {isOver
              ? `${currency} ${(spentVal - limitVal).toLocaleString('en-IN')} over`
              : `${currency} ${Math.abs(remainingVal).toLocaleString('en-IN')} left`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Budgets() {
  const { budgets, currency, addBudget, updateBudget, deleteBudget } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ category: 'food', limit: '', period: new Date().toISOString().slice(0, 7) });

  const expenseCategories = categories.filter((c) => !['salary', 'freelance', 'investment'].includes(c.id));
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openAdd = () => { setEditItem(null); setForm({ category: 'food', limit: '', period: new Date().toISOString().slice(0, 7) }); setModalOpen(true); };
  const openEdit = (b) => { setEditItem(b); setForm({ category: b.category, limit: b.limit, period: b.period }); setModalOpen(true); };

  const handleSave = () => {
    const data = {
      category: form.category,
      limit: parseFloat(form.limit),
      period: form.period,
    };
    if (editItem) updateBudget(editItem.id, data);
    else addBudget(data);
    setModalOpen(false);
  };

  const totalBudget = budgets.reduce((s, b) => s + (b.limit || 0), 0);
  const totalSpent = budgets.reduce((s, b) => s + (b.spent || 0), 0);
  const overBudgetCount = budgets.filter((b) => (b.spent || 0) > (b.limit || 0)).length;

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans]">Budgets</h1>
          <p className="text-sm text-[#8a8a9a]">Track and manage your monthly spending limits</p>
        </div>
        <Button onClick={openAdd}><Plus size={15} />New Budget</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Budget', value: `${currency} ${totalBudget.toLocaleString('en-IN')}` },
          { label: 'Total Spent', value: `${currency} ${totalSpent.toLocaleString('en-IN')}` },
          { label: 'Over Budget', value: `${overBudgetCount} ${overBudgetCount === 1 ? 'category' : 'categories'}`, warn: overBudgetCount > 0 },
        ].map(({ label, value, warn }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-4 text-center">
            <p className="text-xs text-[#8a8a9a] mb-1">{label}</p>
            <p className={`text-xl font-bold font-[Plus_Jakarta_Sans] ${warn ? 'text-red-500' : 'text-[#1a1a2e]'}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Budget cards */}
      {budgets.length === 0 ? (
        <EmptyState illustration={EmptyBudgetsIllustration} title="No budgets set" description="Create a budget to start tracking your spending limits." action={<Button onClick={openAdd}><Plus size={14} />Create Budget</Button>} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((b) => (
            <BudgetCard key={b.id} budget={b} currency={currency} onEdit={openEdit} onDelete={setDeleteId} />
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Budget' : 'Create Budget'} size="sm">
        <div className="flex flex-col gap-4">
          <Select
            label="Category"
            value={form.category}
            onChange={set('category')}
            options={expenseCategories.map((c) => ({ value: c.id, label: c.label }))}
          />
          <Input label={`Monthly Limit (${currency})`} type="number" placeholder="20000" value={form.limit} onChange={set('limit')} min="0" required />
          <Input label="Period" type="month" value={form.period} onChange={set('period')} required />
          <div className="flex gap-3 justify-end pt-1">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.limit}>{editItem ? 'Save Changes' : 'Create Budget'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteBudget(deleteId)}
        title="Delete Budget"
        message="Are you sure you want to delete this budget?"
      />
    </div>
  );
}

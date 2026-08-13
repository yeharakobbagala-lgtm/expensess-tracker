import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { categories, paymentMethods } from '../../data/mockData';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const defaultForm = {
  type: 'expense',
  title: '',
  amount: '',
  category: 'food',
  method: 'Cash',
  date: new Date().toISOString().split('T')[0],
  notes: '',
};

export default function TransactionForm({ initial = null, onSave, onCancel }) {
  const [form, setForm] = useState(initial || defaultForm);
  const { addTransaction, updateTransaction } = useApp();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tx = { ...form, amount: parseFloat(form.amount) };
    if (initial?.id) await updateTransaction(initial.id, tx);
    else await addTransaction(tx);
    if (onSave) onSave();
    else navigate('/transactions');
  };

  const expenseCategories = categories.filter((c) => !['salary', 'freelance', 'investment'].includes(c.id));
  const incomeCategories = categories.filter((c) => ['salary', 'freelance', 'investment'].includes(c.id));
  const activeCategories = form.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Type toggle */}
      <div>
        <p className="text-sm font-medium text-[#1a1a2e] mb-2">Transaction Type</p>
        <div className="flex gap-2 p-1 bg-[#f0f1f5] rounded-xl w-fit">
          {['expense', 'income'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm((f) => ({ ...f, type: t, category: t === 'income' ? 'salary' : 'food' }))}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-150 ${
                form.type === t
                  ? t === 'income' ? 'bg-white shadow-sm text-emerald-600' : 'bg-white shadow-sm text-red-500'
                  : 'text-[#8a8a9a] hover:text-[#4a4a5a]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <Input label="Title" placeholder="e.g. Supermarket Groceries" value={form.title} onChange={set('title')} required />

      <div className="grid grid-cols-2 gap-4">
        <Input label="Amount (Rs.)" type="number" placeholder="0.00" min="0" step="0.01" value={form.amount} onChange={set('amount')} required />
        <Input label="Date" type="date" value={form.date} onChange={set('date')} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Category"
          value={form.category}
          onChange={set('category')}
          options={activeCategories.map((c) => ({ value: c.id, label: c.label }))}
        />
        <Select
          label="Payment Method"
          value={form.method}
          onChange={set('method')}
          options={paymentMethods}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#1a1a2e]">Notes (optional)</label>
        <textarea
          placeholder="Add a note..."
          value={form.notes}
          onChange={set('notes')}
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-[#e8e9ef] bg-white text-[#1a1a2e] text-sm placeholder:text-[#b0b1bb] focus:outline-none focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all resize-none"
        />
      </div>

      <div className="flex gap-3 justify-end pt-2">
        <Button type="button" variant="secondary" onClick={onCancel || (() => navigate('/transactions'))}>
          Cancel
        </Button>
        <Button type="submit">
          {initial ? 'Save Changes' : 'Save Transaction'}
        </Button>
      </div>
    </form>
  );
}

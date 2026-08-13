import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { categories, paymentMethods } from '../data/mockData';
import AddExpenseIllustration from '../components/illustrations/AddExpenseIllustration';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';

export default function AddTransaction() {
  const navigate = useNavigate();
  const { addTransaction } = useApp();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    type: 'expense',
    title: '',
    amount: '',
    category: 'food',
    method: 'Cash',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tx = { ...form, amount: parseFloat(form.amount) };
      await addTransaction(tx);
      navigate('/transactions');
    } catch (err) {
      console.error('Failed to add transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  const expenseCategories = categories.filter((c) => !['salary', 'freelance', 'investment'].includes(c.id));
  const incomeCategories = categories.filter((c) => ['salary', 'freelance', 'investment'].includes(c.id));
  const activeCategories = form.type === 'income' ? incomeCategories : expenseCategories;

  return (
    <div className="max-w-5xl mx-auto py-2 sm:py-6">
      <div className="bg-white rounded-3xl border border-[#e8e9ef] shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side — Yellow Illustration Panel */}
        <div className="md:w-5/12 bg-[#f5c518] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-[#1a1a2e]">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Top Header & Back Button */}
          <div className="relative z-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#1a1a2e] shadow-sm transition-all mb-8"
              title="Go Back"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-3xl font-extrabold font-[Plus_Jakarta_Sans] tracking-tight mb-2">
              Add New Expense
            </h1>
            <p className="text-[#1a1a2e]/80 text-sm font-medium">
              Fill in the details to track your expense accurately.
            </p>
          </div>

          {/* Illustration Asset */}
          <div className="my-auto py-6 relative z-10 flex justify-center">
            <AddExpenseIllustration />
          </div>

          {/* Bottom Accent */}
          <div className="relative z-10 text-xs font-semibold text-[#1a1a2e]/70">
            Smart Financial Tracking
          </div>
        </div>

        {/* Right Side — Form */}
        <div className="md:w-7/12 p-8 sm:p-10 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Type Toggle */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#8a8a9a] mb-2">Transaction Type</p>
              <div className="flex gap-2 p-1.5 bg-[#f0f1f5] rounded-2xl w-fit">
                {['expense', 'income'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, type: t, category: t === 'income' ? 'salary' : 'food' }))}
                    className={`px-6 py-2 rounded-xl text-xs font-bold capitalize transition-all duration-150 ${
                      form.type === t
                        ? t === 'income' ? 'bg-white shadow text-emerald-600' : 'bg-white shadow text-red-500'
                        : 'text-[#8a8a9a] hover:text-[#4a4a5a]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Expense Name"
              placeholder="e.g. Lunch"
              value={form.title}
              onChange={set('title')}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Amount (Rs.)"
                type="number"
                placeholder="e.g. 500"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={set('amount')}
                required
              />
              <Input
                label="Date"
                type="date"
                value={form.date}
                onChange={set('date')}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label className="text-sm font-semibold text-[#1a1a2e]">Notes (Optional)</label>
              <textarea
                placeholder="Add notes here..."
                value={form.notes}
                onChange={set('notes')}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-[#e8e9ef] bg-white text-[#1a1a2e] text-sm placeholder:text-[#b0b1bb] focus:outline-none focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all resize-none"
              />
            </div>

            <div className="flex items-center gap-3 justify-end pt-4 border-t border-[#f0f1f5] mt-2">
              <Button type="button" variant="secondary" className="!rounded-xl border border-[#e8e9ef] px-6" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="!rounded-xl bg-[#f5c518] hover:bg-[#e0b210] text-[#1a1a2e] font-bold px-7 flex items-center gap-2">
                <Check size={18} />
                {loading ? 'Saving...' : 'Save Expense'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

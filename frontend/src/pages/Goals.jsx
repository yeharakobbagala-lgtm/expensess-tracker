import { useState } from 'react';
import { Plus, Edit2, Trash2, Target, Shield, Laptop, Plane, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { EmptyGoalsIllustration } from '../components/illustrations/EmptyStateIllustrations';
import EmptyState from '../components/ui/EmptyState';

const iconMap = { Target, Shield, Laptop, Plane, Home };
const goalIcons = ['Target', 'Shield', 'Laptop', 'Plane', 'Home'];
const goalColors = [
  { value: '#f5c518', label: 'Golden' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#ef4444', label: 'Red' },
  { value: '#10b981', label: 'Emerald' },
];

function GoalCard({ goal, currency, onEdit, onDelete }) {
  const Icon = iconMap[goal.icon] || Target;
  const pct = Math.min((goal.current / goal.target) * 100, 100);
  const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const remaining = goal.target - goal.current;

  return (
    <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${goal.color}18` }}>
            <Icon size={20} style={{ color: goal.color }} />
          </div>
          <div>
            <p className="font-semibold text-[#1a1a2e]">{goal.title}</p>
            <p className="text-xs text-[#8a8a9a]">{daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(goal)} className="p-1.5 rounded-lg hover:bg-[#f0f1f5] text-[#8a8a9a] hover:text-[#1a1a2e] transition-colors"><Edit2 size={14} /></button>
          <button onClick={() => onDelete(goal.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#8a8a9a] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
        </div>
      </div>

      {/* Progress ring + info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#f0f1f5" strokeWidth="6" />
            <circle
              cx="32" cy="32" r="26" fill="none"
              stroke={goal.color} strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#1a1a2e]">
            {Math.round(pct)}%
          </span>
        </div>
        <div className="flex-1">
          <p className="text-lg font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans]">
            {currency} {goal.current.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-[#8a8a9a]">of {currency} {goal.target.toLocaleString('en-IN')}</p>
          <p className="text-xs text-[#b0b1bb] mt-0.5">{currency} {remaining.toLocaleString('en-IN')} to go</p>
        </div>
      </div>

      <div className="h-2 bg-[#f0f1f5] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: goal.color }}
        />
      </div>
      <p className="text-xs text-[#b0b1bb] mt-2">Target date: {new Date(goal.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
    </div>
  );
}

const defaultForm = { title: '', target: '', current: '', deadline: '', icon: 'Target', color: '#f5c518' };

export default function Goals() {
  const { goals, currency, addGoal, updateGoal, deleteGoal } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(defaultForm);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const openAdd = () => { setEditItem(null); setForm(defaultForm); setModalOpen(true); };
  const openEdit = (g) => { setEditItem(g); setForm({ title: g.title, target: g.target, current: g.current, deadline: g.deadline, icon: g.icon, color: g.color }); setModalOpen(true); };
  const handleSave = () => {
    const data = { ...form, target: parseFloat(form.target), current: parseFloat(form.current) };
    if (editItem) updateGoal(editItem.id, data);
    else addGoal(data);
    setModalOpen(false);
  };

  const totalSaved = goals.reduce((s, g) => s + g.current, 0);
  const totalTarget = goals.reduce((s, g) => s + g.target, 0);

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans]">Savings Goals</h1>
          <p className="text-sm text-[#8a8a9a]">Work toward your financial milestones</p>
        </div>
        <Button onClick={openAdd}><Plus size={15} />New Goal</Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Goals', value: goals.length },
          { label: 'Total Saved', value: `${currency} ${totalSaved.toLocaleString('en-IN')}` },
          { label: 'Overall Progress', value: `${totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-4 text-center">
            <p className="text-xs text-[#8a8a9a] mb-1">{label}</p>
            <p className="text-xl font-bold font-[Plus_Jakarta_Sans] text-[#1a1a2e]">{value}</p>
          </div>
        ))}
      </div>

      {goals.length === 0 ? (
        <EmptyState illustration={EmptyGoalsIllustration} title="No goals yet" description="Set a savings goal to start working toward your dreams." action={<Button onClick={openAdd}><Plus size={14} />Create Goal</Button>} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((g) => <GoalCard key={g.id} goal={g} currency={currency} onEdit={openEdit} onDelete={setDeleteId} />)}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Goal' : 'New Savings Goal'} size="md">
        <div className="flex flex-col gap-4">
          <Input label="Goal Title" placeholder="Emergency Fund" value={form.title} onChange={set('title')} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label={`Target Amount (${currency})`} type="number" placeholder="300000" value={form.target} onChange={set('target')} required />
            <Input label={`Current Amount (${currency})`} type="number" placeholder="0" value={form.current} onChange={set('current')} required />
          </div>
          <Input label="Target Date" type="date" value={form.deadline} onChange={set('deadline')} required />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Icon" value={form.icon} onChange={set('icon')} options={goalIcons.map((i) => ({ value: i, label: i }))} />
            <Select label="Color" value={form.color} onChange={set('color')} options={goalColors} />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.title || !form.target}>{editItem ? 'Save Changes' : 'Create Goal'}</Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteGoal(deleteId)} title="Delete Goal" message="Are you sure you want to delete this goal?" />
    </div>
  );
}

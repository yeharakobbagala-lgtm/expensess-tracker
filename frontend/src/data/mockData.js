export const currentUser = {
  id: 1,
  name: 'Yehara Perera',
  email: 'yehara@example.com',
  avatar: null,
  currency: 'Rs.',
  joinedAt: new Date().toISOString().split('T')[0],
};

export const categories = [
  { id: 'food', label: 'Food & Dining', color: '#f59e0b', icon: 'UtensilsCrossed' },
  { id: 'transport', label: 'Transport', color: '#3b82f6', icon: 'Car' },
  { id: 'shopping', label: 'Shopping', color: '#8b5cf6', icon: 'ShoppingBag' },
  { id: 'utilities', label: 'Utilities', color: '#06b6d4', icon: 'Zap' },
  { id: 'health', label: 'Health', color: '#ef4444', icon: 'Heart' },
  { id: 'entertainment', label: 'Entertainment', color: '#ec4899', icon: 'Film' },
  { id: 'education', label: 'Education', color: '#10b981', icon: 'BookOpen' },
  { id: 'salary', label: 'Salary', color: '#22c55e', icon: 'Briefcase' },
  { id: 'freelance', label: 'Freelance', color: '#84cc16', icon: 'Laptop' },
  { id: 'investment', label: 'Investment', color: '#f5c518', icon: 'TrendingUp' },
  { id: 'other', label: 'Other', color: '#94a3b8', icon: 'MoreHorizontal' },
];

export const paymentMethods = ['Cash', 'Debit Card', 'Credit Card', 'Bank Transfer', 'Online Payment', 'QR Payment'];

export const transactions = [
  { id: 1, title: 'Monthly Salary', category: 'salary', type: 'income', amount: 120000, date: '2026-08-01', method: 'Bank Transfer', notes: 'Monthly salary' },
  { id: 2, title: 'Keells / Cargills Groceries', category: 'food', type: 'expense', amount: 8500, date: '2026-08-02', method: 'Cash', notes: 'Weekly groceries' },
  { id: 3, title: 'Three-Wheeler / Tuk Tuk', category: 'transport', type: 'expense', amount: 1500, date: '2026-08-03', method: 'Cash', notes: 'Daily commute' },
  { id: 4, title: 'Clothing & Apparel', category: 'shopping', type: 'expense', amount: 8000, date: '2026-08-03', method: 'Credit Card', notes: 'Shopping' },
  { id: 5, title: 'Electricity & Water Bill', category: 'utilities', type: 'expense', amount: 6500, date: '2026-08-04', method: 'Online Payment', notes: 'CEB & NWSDB bills' },
  { id: 6, title: 'Freelance Web Design', category: 'freelance', type: 'income', amount: 25000, date: '2026-08-05', method: 'Bank Transfer', notes: 'React website project' },
  { id: 7, title: 'Doctor Consultation', category: 'health', type: 'expense', amount: 3500, date: '2026-08-05', method: 'Debit Card', notes: 'Medical checkup' },
  { id: 8, title: 'Mobile Reload & Data', category: 'utilities', type: 'expense', amount: 2000, date: '2026-08-06', method: 'QR Payment', notes: 'Dialog monthly package' },
  { id: 9, title: 'Restaurant Dinner', category: 'food', type: 'expense', amount: 4500, date: '2026-08-07', method: 'Credit Card', notes: 'Family dinner' },
  { id: 10, title: 'Cinema & Snacks', category: 'entertainment', type: 'expense', amount: 3000, date: '2026-08-08', method: 'Debit Card', notes: 'Weekend movie' },
  { id: 11, title: 'Monthly House Rent', category: 'other', type: 'expense', amount: 30000, date: '2026-08-09', method: 'Bank Transfer', notes: 'Apartment rent' },
  { id: 12, title: 'Higher Education Fee', category: 'education', type: 'expense', amount: 10000, date: '2026-08-10', method: 'Bank Transfer', notes: 'Course fee' },
];

export const budgets = [
  { id: 1, category: 'food', limit: 20000, spent: 13000, period: '2026-08' },
  { id: 2, category: 'transport', limit: 10000, spent: 4500, period: '2026-08' },
  { id: 3, category: 'shopping', limit: 15000, spent: 8000, period: '2026-08' },
  { id: 4, category: 'utilities', limit: 12000, spent: 8500, period: '2026-08' },
  { id: 5, category: 'entertainment', limit: 8000, spent: 3000, period: '2026-08' },
  { id: 6, category: 'health', limit: 5000, spent: 3500, period: '2026-08' },
];

export const goals = [
  { id: 1, title: 'Emergency Fund', target: 300000, current: 180000, deadline: '2026-12-31', icon: 'Shield', color: '#3b82f6' },
  { id: 2, title: 'New Laptop', target: 250000, current: 120000, deadline: '2026-11-15', icon: 'Laptop', color: '#8b5cf6' },
  { id: 3, title: 'Education Fund', target: 200000, current: 85000, deadline: '2026-10-31', icon: 'BookOpen', color: '#10b981' },
  { id: 4, title: 'Vehicle Fund', target: 1000000, current: 350000, deadline: '2027-06-30', icon: 'Car', color: '#f5c518' },
];

export const monthlyData = [
  { month: 'Mar', income: 120000, expenses: 45000 },
  { month: 'Apr', income: 120000, expenses: 52000 },
  { month: 'May', income: 120000, expenses: 48000 },
  { month: 'Jun', income: 125000, expenses: 55000 },
  { month: 'Jul', income: 145000, expenses: 60000 },
  { month: 'Aug', income: 145000, expenses: 47500 },
];

export const weeklyData = [
  { week: 'Week 1', amount: 12500 },
  { week: 'Week 2', amount: 11000 },
  { week: 'Week 3', amount: 14000 },
  { week: 'Week 4', amount: 10000 },
];

export const categorySpending = [
  { name: 'Food & Dining', value: 13000, color: '#f59e0b' },
  { name: 'Transport', value: 4500, color: '#3b82f6' },
  { name: 'Shopping', value: 8000, color: '#8b5cf6' },
  { name: 'Utilities', value: 8500, color: '#06b6d4' },
  { name: 'Health', value: 3500, color: '#ef4444' },
  { name: 'Entertainment', value: 3000, color: '#ec4899' },
  { name: 'Education', value: 10000, color: '#10b981' },
  { name: 'Other', value: 30000, color: '#94a3b8' },
];

export const insights = [
  { id: 1, type: 'positive', text: 'You spent 12% less this month compared to last month.' },
  { id: 2, type: 'warning', text: 'Rent and utilities represent your primary monthly commitments.' },
  { id: 3, type: 'info', text: 'Your savings rate this month is 67% — excellent financial planning!' },
  { id: 4, type: 'warning', text: 'Utilities budget is at 71% — review your monthly energy & data packages.' },
];

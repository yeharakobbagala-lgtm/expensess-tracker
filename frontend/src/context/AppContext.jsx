import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  transactions as initialTransactions,
  budgets as initialBudgets,
  goals as initialGoals,
  currentUser,
} from '../data/mockData';
import { translations } from '../data/translations';
import { authApi, transactionsApi, budgetsApi, goalsApi } from '../services/api';

const AppContext = createContext(null);

const getSavedUser = () => {
  try {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => getSavedUser() || currentUser);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState(initialBudgets);
  const [goals, setGoals] = useState(initialGoals);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [currency, setCurrency] = useState('Rs.');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const t = useCallback((key) => {
    const langObj = translations[language] || translations.en;
    return langObj[key] || translations.en[key] || key;
  }, [language]);

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await transactionsApi.getAll();
      if (Array.isArray(data)) {
        setTransactions(data);
      }
    } catch (err) {
      console.warn('Failed to fetch transactions from backend:', err);
    }
  }, []);

  const fetchBudgets = useCallback(async () => {
    try {
      const data = await budgetsApi.getAll();
      if (Array.isArray(data)) {
        setBudgets(data);
      }
    } catch (err) {
      console.warn('Failed to fetch budgets from backend:', err);
    }
  }, []);

  const fetchGoals = useCallback(async () => {
    try {
      const data = await goalsApi.getAll();
      if (Array.isArray(data)) {
        setGoals(data);
      }
    } catch (err) {
      console.warn('Failed to fetch goals from backend:', err);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions();
      fetchBudgets();
      fetchGoals();
    } else {
      setTransactions(initialTransactions);
      setBudgets(initialBudgets);
      setGoals(initialGoals);
    }
  }, [isAuthenticated, fetchTransactions, fetchBudgets, fetchGoals]);

  const login = useCallback(async (email, password) => {
    const res = await authApi.login(email, password);
    if (res && res.token) {
      localStorage.setItem('token', res.token);
    }
    setUser((prev) => {
      const nameFromBackend = res?.fullName || res?.name;
      const finalName = nameFromBackend || (prev?.name && prev.name.length > 0 ? prev.name : email.split('@')[0]);
      const updated = { ...prev, email, name: finalName };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
    setIsAuthenticated(true);
    return res;
  }, []);

  const register = useCallback(async (fullName, email, password) => {
    await authApi.register(fullName, email, password);
    const updated = { ...currentUser, email, name: fullName };
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    return login(email, password);
  }, [login]);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(currentUser);
    setTransactions([]);
    setBudgets([]);
    setGoals([]);
  }, []);

  const addTransaction = useCallback(async (tx) => {
    try {
      const saved = await transactionsApi.create(tx);
      setTransactions((prev) => [saved, ...prev]);
      fetchBudgets();
      return saved;
    } catch (err) {
      console.error('Failed to add transaction to backend:', err);
      const fallback = { ...tx, id: Date.now() };
      setTransactions((prev) => [fallback, ...prev]);
      return fallback;
    }
  }, [fetchBudgets]);

  const updateTransaction = useCallback(async (id, data) => {
    try {
      const updated = await transactionsApi.update(id, data);
      setTransactions((prev) => prev.map((t) => (t.id === id ? updated : t)));
      fetchBudgets();
      return updated;
    } catch (err) {
      console.error('Failed to update transaction on backend:', err);
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    }
  }, [fetchBudgets]);

  const deleteTransaction = useCallback(async (id) => {
    try {
      await transactionsApi.delete(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      fetchBudgets();
    } catch (err) {
      console.error('Failed to delete transaction on backend:', err);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  }, [fetchBudgets]);

  const addBudget = useCallback(async (b) => {
    try {
      await budgetsApi.create(b);
      await fetchBudgets();
    } catch (err) {
      console.error('Failed to add budget to backend:', err);
    }
  }, [fetchBudgets]);

  const updateBudget = useCallback(async (id, data) => {
    try {
      await budgetsApi.update(id, data);
      await fetchBudgets();
    } catch (err) {
      console.error('Failed to update budget on backend:', err);
    }
  }, [fetchBudgets]);

  const deleteBudget = useCallback(async (id) => {
    try {
      await budgetsApi.delete(id);
      await fetchBudgets();
    } catch (err) {
      console.error('Failed to delete budget on backend:', err);
    }
  }, [fetchBudgets]);

  const addGoal = useCallback(async (g) => {
    try {
      await goalsApi.create(g);
      await fetchGoals();
    } catch (err) {
      console.error('Failed to add goal to backend:', err);
    }
  }, [fetchGoals]);

  const updateGoal = useCallback(async (id, data) => {
    try {
      await goalsApi.update(id, data);
      await fetchGoals();
    } catch (err) {
      console.error('Failed to update goal on backend:', err);
    }
  }, [fetchGoals]);

  const deleteGoal = useCallback(async (id) => {
    try {
      await goalsApi.delete(id);
      await fetchGoals();
    } catch (err) {
      console.error('Failed to delete goal on backend:', err);
    }
  }, [fetchGoals]);

  const value = {
    user,
    setUser,
    isAuthenticated,
    currency,
    setCurrency,
    theme,
    setTheme,
    toggleTheme,
    language,
    setLanguage,
    t,
    transactions,
    budgets,
    goals,
    login,
    register,
    logout,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    addGoal,
    updateGoal,
    deleteGoal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

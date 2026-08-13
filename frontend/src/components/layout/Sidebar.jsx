import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, BarChart2, Wallet,
  Target, User, Settings, LogOut, Coins, X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, key: 'transactions' },
  { to: '/analytics', icon: BarChart2, key: 'analytics' },
  { to: '/budgets', icon: Wallet, key: 'budgets' },
  { to: '/goals', icon: Target, key: 'goals' },
  { to: '/profile', icon: User, key: 'profile' },
  { to: '/settings', icon: Settings, key: 'settings' },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { user, logout, t } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const content = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e8e9ef]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#f5c518] rounded-xl flex items-center justify-center">
            <Coins size={16} className="text-[#1a1a2e]" />
          </div>
          <span className="font-bold text-[#1a1a2e] text-base font-[Plus_Jakarta_Sans]">ExpenseTracker</span>
        </div>
        <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-[#f0f1f5] text-[#8a8a9a]">
          <X size={16} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#b0b1bb] px-3 mb-2">Menu</p>
        <ul className="flex flex-col gap-0.5">
          {navItems.map(({ to, icon: Icon, key }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#f5c518] text-[#1a1a2e]'
                      : 'text-[#4a4a5a] hover:bg-[#f7f8fa] hover:text-[#1a1a2e]'
                  }`
                }
              >
                <Icon size={17} />
                {t(key)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="px-3 py-4 border-t border-[#e8e9ef]">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-[#f5c518] flex items-center justify-center font-bold text-sm text-[#1a1a2e]">
            {(user?.name || 'User').charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1a1a2e] truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-[#8a8a9a] truncate">{user?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#e53935] hover:bg-red-50 transition-colors"
        >
          <LogOut size={17} />
          {t('logout')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-[#e8e9ef] fixed left-0 top-0 bottom-0 z-30">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <aside className="relative w-64 bg-white h-full shadow-2xl flex flex-col">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}

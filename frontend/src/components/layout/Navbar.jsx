import { Menu, Bell, Plus, Sun, Moon, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../ui/Button';

export default function Navbar({ onMenuClick }) {
  const { user, theme, toggleTheme, language, setLanguage, t } = useApp();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-[#e8e9ef] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20 transition-colors">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-[#f0f1f5] text-[#4a4a5a]"
      >
        <Menu size={20} />
      </button>
      <div className="hidden lg:block" />

      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <div className="relative flex items-center">
          <Globe size={15} className="absolute left-2.5 text-[#8a8a9a] pointer-events-none" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="pl-7 pr-2 py-1.5 rounded-xl border border-[#e8e9ef] bg-white text-xs font-semibold text-[#1a1a2e] focus:outline-none focus:ring-1 focus:ring-[#f5c518] cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="si">සිං</option>
            <option value="ta">த</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-[#f0f1f5] text-[#4a4a5a] transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} className="text-[#f5c518]" /> : <Moon size={18} />}
        </button>

        <Button size="sm" onClick={() => navigate('/transactions/add')}>
          <Plus size={15} />
          {t('addTransaction')}
        </Button>
        
        <button className="relative p-2 rounded-xl hover:bg-[#f0f1f5] text-[#4a4a5a]">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#f5c518]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[#f5c518] flex items-center justify-center font-bold text-sm text-[#1a1a2e] ml-1 cursor-pointer" onClick={() => navigate('/profile')}>
          {(user?.name || 'User').charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}

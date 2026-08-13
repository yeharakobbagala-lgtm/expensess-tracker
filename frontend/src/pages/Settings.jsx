import { useState } from 'react';
import { LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';

function SettingRow({ label, description, children }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#f0f1f5] last:border-0">
      <div>
        <p className="text-sm font-medium text-[#1a1a2e]">{label}</p>
        {description && <p className="text-xs text-[#8a8a9a] mt-0.5">{description}</p>}
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-[#f5c518]' : 'bg-[#d0d1db]'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

export default function Settings() {
  const { currency, setCurrency, theme, toggleTheme, language, setLanguage, logout, t } = useApp();
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState({ budget: true, goal: true, weekly: false, tips: true });
  const toggleNotif = (k) => () => setNotifs((n) => ({ ...n, [k]: !n[k] }));

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans]">{t('settings')}</h1>
        <p className="text-sm text-[#8a8a9a]">Customize your app preferences</p>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
        <h2 className="font-semibold text-[#1a1a2e] mb-1">{t('preferences')}</h2>
        
        <SettingRow label={t('language')} description="Select application language">
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            options={[
              { value: 'en', label: 'English 🇬🇧' },
              { value: 'si', label: 'සිංහල (Sinhala) 🇱🇰' },
              { value: 'ta', label: 'தமிழ் (Tamil) 🇱🇰' },
            ]}
            className="!py-1.5 !text-xs min-w-44"
          />
        </SettingRow>

        <SettingRow label={t('theme')} description="Switch between Light and Dark Mode">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#4a4a5a]">
              {theme === 'dark' ? t('darkMode') : t('lightMode')}
            </span>
            <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
          </div>
        </SettingRow>

        <SettingRow label={t('currency')} description="Default currency for all amounts">
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            options={[
              { value: 'Rs.', label: 'Rs. — Sri Lankan Rupee (LKR)' },
              { value: '$', label: '$ — US Dollar (USD)' },
              { value: '€', label: '€ — Euro (EUR)' },
              { value: '£', label: '£ — British Pound (GBP)' },
            ]}
            className="!py-1.5 !text-xs min-w-44"
          />
        </SettingRow>
        
        <SettingRow label={t('countryRegion')} description="Primary location">
          <span className="text-xs bg-[#f0f1f5] text-[#4a4a5a] px-3 py-1.5 rounded-lg font-medium">Sri Lanka 🇱🇰</span>
        </SettingRow>
        
        <SettingRow label={t('timezone')} description="Application time region">
          <span className="text-xs bg-[#f0f1f5] text-[#4a4a5a] px-3 py-1.5 rounded-lg font-medium">Asia/Colombo (GMT+5:30)</span>
        </SettingRow>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
        <h2 className="font-semibold text-[#1a1a2e] mb-1">Notifications</h2>
        <SettingRow label="Budget Alerts" description="Notify when approaching budget limits">
          <Toggle checked={notifs.budget} onChange={toggleNotif('budget')} />
        </SettingRow>
        <SettingRow label="Goal Milestones" description="Celebrate when you reach goal milestones">
          <Toggle checked={notifs.goal} onChange={toggleNotif('goal')} />
        </SettingRow>
        <SettingRow label="Weekly Summary" description="Receive a weekly spending summary">
          <Toggle checked={notifs.weekly} onChange={toggleNotif('weekly')} />
        </SettingRow>
        <SettingRow label="Financial Tips" description="Smart insights and money-saving tips">
          <Toggle checked={notifs.tips} onChange={toggleNotif('tips')} />
        </SettingRow>
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-5">
        <h2 className="font-semibold text-[#1a1a2e] mb-1">Account</h2>
        <SettingRow label="Export Data" description="Download all your transactions as CSV">
          <button className="flex items-center gap-1.5 text-xs text-[#4a4a5a] font-medium hover:text-[#1a1a2e] transition-colors">
            Export <ChevronRight size={14} />
          </button>
        </SettingRow>
        <SettingRow label="Delete Account" description="Permanently delete your account and data">
          <button className="text-xs text-red-500 font-medium hover:text-red-600 transition-colors">
            Delete Account
          </button>
        </SettingRow>
      </div>

      <div className="pb-4">
        <Button variant="danger" className="w-full" onClick={handleLogout}>
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

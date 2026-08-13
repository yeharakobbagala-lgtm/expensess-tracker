import { useState } from 'react';
import { Camera, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { userApi } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Profile() {
  const { user, setUser } = useApp();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
  const [showPwd, setShowPwd] = useState({ current: false, new: false, confirm: false });
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setPwd = (k) => (e) => setPwdForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await userApi.updateProfile({ name: form.name, email: form.email });
      setUser((u) => {
        const updated = { ...u, name: res.fullName || form.name, email: res.email || form.email };
        localStorage.setItem('user', JSON.stringify(updated));
        return updated;
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans]">Profile</h1>
        <p className="text-sm text-[#8a8a9a]">Manage your personal information</p>
      </div>

      {/* Avatar */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#f5c518] flex items-center justify-center text-3xl font-bold text-[#1a1a2e]">
              {(user?.name || 'User').charAt(0).toUpperCase()}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#1a1a2e] rounded-full flex items-center justify-center hover:bg-[#f5c518] hover:text-[#1a1a2e] text-white transition-colors">
              <Camera size={13} />
            </button>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a2e] text-lg">{user?.name || 'User'}</p>
            <p className="text-sm text-[#8a8a9a]">{user?.email || ''}</p>
            <p className="text-xs text-[#b0b1bb] mt-1">Member since {new Date(user?.joinedAt || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-6">
        <h2 className="font-semibold text-[#1a1a2e] mb-5">Personal Information</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600">
              {errorMsg}
            </div>
          )}
          <Input label="Full Name" value={form.name} onChange={set('name')} required />
          <Input label="Email Address" type="email" value={form.email} onChange={set('email')} required />
          <div className="flex justify-end pt-1">
            <Button type="submit">
              {saved ? <><CheckCircle size={15} /> Saved!</> : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-[#e8e9ef] shadow-sm p-6">
        <h2 className="font-semibold text-[#1a1a2e] mb-5">Change Password</h2>
        <div className="flex flex-col gap-4">
          {[
            { key: 'current', label: 'Current Password', showKey: 'current' },
            { key: 'newPwd', label: 'New Password', showKey: 'new' },
            { key: 'confirm', label: 'Confirm New Password', showKey: 'confirm' },
          ].map(({ key, label, showKey }) => (
            <div key={key} className="relative flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1a1a2e]">{label}</label>
              <div className="relative">
                <input
                  type={showPwd[showKey] ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={pwdForm[key]}
                  onChange={setPwd(key)}
                  className="w-full px-4 py-2.5 pr-12 rounded-xl border border-[#e8e9ef] bg-white text-[#1a1a2e] text-sm placeholder:text-[#b0b1bb] focus:outline-none focus:ring-2 focus:ring-[#f5c518] focus:border-transparent"
                />
                <button type="button" onClick={() => setShowPwd((s) => ({ ...s, [showKey]: !s[showKey] }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a9a]">
                  {showPwd[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-end pt-1">
            <Button disabled={!pwdForm.current || !pwdForm.newPwd || pwdForm.newPwd !== pwdForm.confirm}>
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

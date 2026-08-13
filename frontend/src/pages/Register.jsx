import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import RegisterIllustration from '../components/illustrations/RegisterIllustration';

function getStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useApp();
  const navigate = useNavigate();
  const strength = getStrength(form.password);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return;
    setLoading(true);
    setError('');
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checks = [
    { ok: form.password.length >= 8, text: 'At least 8 characters' },
    { ok: /[A-Z]/.test(form.password), text: 'One uppercase letter' },
    { ok: /[0-9]/.test(form.password), text: 'One number' },
  ];

  return (
    <div className="min-h-screen flex bg-[#f7f8fa]">
      {/* Left panel — Yellow/Cream Illustration Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#fffef0] flex-col justify-between p-12 relative overflow-hidden border-r border-[#f0f1f5]">
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-12 h-12 bg-[#f5c518] rounded-full flex items-center justify-center shadow-md">
            <Wallet size={22} className="text-[#1a1a2e]" />
          </div>
          <div>
            <span className="font-bold text-2xl font-[Plus_Jakarta_Sans] text-[#1a1a2e]">
              Expense <span className="text-[#f5c518]">Tracker</span>
            </span>
          </div>
        </div>

        <div className="my-auto py-6 relative z-10 flex flex-col items-start gap-4 max-w-lg">
          <div className="mb-2">
            <h1 className="text-4xl font-extrabold text-[#1a1a2e] font-[Plus_Jakarta_Sans] leading-tight mb-3">
              Start your financial<br />
              <span className="text-[#f5c518]">journey today.</span>
            </h1>
            <p className="text-[#8a8a9a] text-base font-medium">
              Create an account, set savings goals, and watch your progress grow.
            </p>
          </div>

          <RegisterIllustration />
        </div>

        <div className="relative z-10 text-xs text-[#b0b1bb]">
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </div>
      </div>

      {/* Right panel — Registration Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#e8e9ef] shadow-xl p-8 sm:p-10">
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-10 h-10 bg-[#f5c518] rounded-full flex items-center justify-center">
              <Wallet size={20} className="text-[#1a1a2e]" />
            </div>
            <span className="font-bold text-[#1a1a2e] text-xl font-[Plus_Jakarta_Sans]">
              Expense <span className="text-[#f5c518]">Tracker</span>
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans] mb-1">
              Create Account ✨
            </h2>
            <p className="text-[#8a8a9a] text-sm">Start tracking your finances for free</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Full Name" type="text" placeholder="Yehara Perera" value={form.name} onChange={set('name')} required />
            <Input label="Email Address" type="email" placeholder="yehara@example.com" value={form.email} onChange={set('email')} required />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1a1a2e]">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={set('password')}
                  required
                  className="w-full px-4 py-2.5 pr-12 rounded-xl border border-[#e8e9ef] bg-white text-[#1a1a2e] text-sm placeholder:text-[#b0b1bb] focus:outline-none focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a8a9a]">
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {form.password && (
                <>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1.5 rounded-full transition-all duration-300"
                        style={{ backgroundColor: i <= strength ? strengthColors[strength] : '#e8e9ef' }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]}
                  </p>
                  <div className="flex flex-col gap-1 mt-1">
                    {checks.map(({ ok, text }) => (
                      <div key={text} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className={ok ? 'text-emerald-500' : 'text-[#d0d1db]'} />
                        <span className={`text-xs ${ok ? 'text-emerald-600' : 'text-[#8a8a9a]'}`}>{text}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={set('confirm')}
              error={form.confirm && form.password !== form.confirm ? 'Passwords do not match' : ''}
              required
            />

            <Button type="submit" size="lg" className="w-full mt-2 !py-3 bg-[#f5c518] hover:bg-[#e0b210] text-[#1a1a2e] font-bold flex items-center justify-center gap-2" disabled={loading || strength < 2 || form.password !== form.confirm}>
              {loading ? 'Creating Account...' : <>Create Account <ArrowRight size={18} /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-[#8a8a9a] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#f5c518] font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

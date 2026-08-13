import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Wallet, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import LoginIllustration from '../components/illustrations/LoginIllustration';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.message || '';
      if (!msg || msg.includes('status') || msg.includes('403') || msg.includes('401') || msg.includes('Forbidden')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

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
              Track your expenses.<br />
              Manage your money.<br />
              <span className="text-[#f5c518]">Achieve your goals.</span>
            </h1>
            <p className="text-[#8a8a9a] text-base font-medium">
              Smart budgeting and real-time expense tracking made simple.
            </p>
          </div>

          <LoginIllustration />
        </div>

        <div className="relative z-10 text-xs text-[#b0b1bb]">
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </div>
      </div>

      {/* Right panel — Form Card */}
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

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1a1a2e] font-[Plus_Jakarta_Sans] mb-1">
              Welcome Back! 👋
            </h2>
            <p className="text-[#8a8a9a] text-sm">Please sign in to your account</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="yehara@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#1a1a2e]">Password</label>
                <a href="#" className="text-xs text-[#1a1a2e] font-semibold hover:text-[#f5c518] transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#e8e9ef] bg-white text-[#1a1a2e] text-sm placeholder:text-[#b0b1bb] focus:outline-none focus:ring-2 focus:ring-[#f5c518] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a8a9a] hover:text-[#1a1a2e]"
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 accent-[#f5c518] rounded"
                />
                <span className="text-sm text-[#4a4a5a]">Remember me</span>
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full mt-2 !py-3 bg-[#f5c518] hover:bg-[#e0b210] text-[#1a1a2e] font-bold flex items-center justify-center gap-2" disabled={loading}>
              {loading ? 'Signing In...' : <>Sign In <ArrowRight size={18} /></>}
            </Button>
          </form>

          <p className="text-center text-sm text-[#8a8a9a] mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#f5c518] font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

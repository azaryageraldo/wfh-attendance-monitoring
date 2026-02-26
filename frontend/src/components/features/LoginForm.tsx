import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ClipboardCheck } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  isLoading: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.email) newErrors.email = 'Email wajib diisi';
    if (!form.password) newErrors.password = 'Password wajib diisi';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    
    try {
      await onSubmit(form);
    } catch (err: any) {
      setErrors({ root: err.response?.data?.message || 'Terjadi kesalahan saat login' });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEtMSAyLTEgMi0ydi0yYzAtMi0yLTItMi0ySDI0Yy0yIDAtMiAyLTIgMnYyYzAgMSAxIDEgMiAyaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 shadow-2xl shadow-black/20">
            <ClipboardCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-center mb-4">
            WFH Attendance
          </h1>
          <p className="text-slate-300 text-center text-lg max-w-md leading-relaxed">
            Sistem monitoring absensi karyawan terintegrasi dan modern.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold">100+</p>
              <p className="text-xs text-slate-400 mt-1">Karyawan</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-xs text-slate-400 mt-1">Kehadiran</p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-slate-400 mt-1">Monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/25">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">WFH Attendance</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Login Portal</h2>
            <p className="text-slate-500 mt-1">Silakan masuk menggunakan kredensial Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.root && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {errors.root}
              </div>
            )}

            <Input
              label="Email"
              type="email"
              placeholder="contoh@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
              leftIcon={<Lock className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-slate-600 transition-colors cursor-pointer outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full mt-2"
              size="lg"
            >
              Masuk
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            © 2026 WFH Attendance Monitoring System
          </p>
        </div>
      </div>
    </div>
  );
}

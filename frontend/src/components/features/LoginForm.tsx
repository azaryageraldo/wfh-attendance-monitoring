import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ClipboardCheck } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!form.email) newErrors.email = 'Email wajib diisi';
    if (!form.password) newErrors.password = 'Password wajib diisi';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // TODO: integrate with auth service
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzEtMSAyLTEgMi0ydi0yYzAtMi0yLTItMi0ySDI0Yy0yIDAtMiAyLTIgMnYyYzAgMSAxIDEgMiAyaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8 shadow-2xl shadow-black/20">
            <ClipboardCheck className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-center mb-4">
            WFH Attendance
          </h1>
          <p className="text-blue-200 text-center text-lg max-w-md leading-relaxed">
            Sistem monitoring absensi karyawan Work From Home yang
            terintegrasi dan modern.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold">100+</p>
              <p className="text-xs text-blue-200 mt-1">Karyawan</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold">98%</p>
              <p className="text-xs text-blue-200 mt-1">Kehadiran</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-2xl font-bold">24/7</p>
              <p className="text-xs text-blue-200 mt-1">Monitoring</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <ClipboardCheck className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">WFH Attendance</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Selamat Datang 👋</h2>
            <p className="text-slate-500 mt-1">Masuk ke akun Anda untuk melanjutkan</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="contoh@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Masukkan password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={errors.password}
                leftIcon={<Lock className="w-4 h-4" />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[34px] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

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

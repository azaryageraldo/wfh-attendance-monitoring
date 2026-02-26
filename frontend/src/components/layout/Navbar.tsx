import { Bell, Search, User } from 'lucide-react';

interface NavbarProps {
  title?: string;
}

export default function Navbar({ title = 'Dashboard' }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left - Page Title */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-100/80 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari..."
              className="bg-transparent text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none w-40"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-700">Admin HR</p>
              <p className="text-xs text-slate-400">admin@gmail.com</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 cursor-pointer">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

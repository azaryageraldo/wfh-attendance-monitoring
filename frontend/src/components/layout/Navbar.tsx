import { Bell, Menu, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/karyawan': 'Master Karyawan',
  '/karyawan/create': 'Tambah Karyawan',
  '/presensi': 'Presensi',
  '/presensi/history': 'Riwayat Presensi',
  '/monitoring': 'Monitoring',
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith('/karyawan/edit/')) return 'Edit Karyawan';
  return 'Dashboard';
}

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-20 h-14 sm:h-16 border-b border-slate-100 bg-white/80 backdrop-blur-lg">
      <div className="flex items-center justify-between h-full px-3 sm:px-6">
        {/* Left - Hamburger + Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-1 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-slate-800">{title}</h2>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-slate-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-700">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400">{user?.email || '-'}</p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-md shadow-slate-500/20 cursor-pointer">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

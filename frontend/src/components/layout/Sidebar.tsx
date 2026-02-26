import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Monitor,
  LogOut,
  ChevronLeft,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Karyawan', href: '/karyawan', icon: Users },
  { name: 'Presensi', href: '/presensi', icon: ClipboardCheck },
  { name: 'Monitoring', href: '/monitoring', icon: Monitor },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-40
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900
        border-r border-slate-700/50
        flex flex-col
        transition-all duration-300 ease-out
        ${collapsed ? 'w-[72px]' : 'w-64'}
      `}
    >
      {/* Logo / Brand */}
      <div className="flex items-center h-16 px-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
            <ClipboardCheck className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="whitespace-nowrap">
              <h1 className="text-sm font-bold text-white tracking-tight">WFH Attendance</h1>
              <p className="text-[10px] text-slate-400 -mt-0.5">Monitoring System</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-sm font-medium transition-all duration-200
              ${isActive
                ? 'bg-blue-600/20 text-blue-400 shadow-sm shadow-blue-500/10'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700/50 space-y-1">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full cursor-pointer"
        >
          <ChevronLeft className={`w-5 h-5 shrink-0 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
        <button className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 w-full cursor-pointer ${collapsed ? 'justify-center' : ''}`}>
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </aside>
  );
}

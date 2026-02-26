import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface DashboardLayoutProps {
  title?: string;
}

export default function DashboardLayout({ title }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div
        className={`transition-all duration-300 ease-out ${
          collapsed ? 'ml-[72px]' : 'ml-64'
        }`}
      >
        <Navbar title={title} />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

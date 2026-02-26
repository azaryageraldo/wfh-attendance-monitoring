import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import KaryawanList from './pages/karyawan/KaryawanList';
import CreateKaryawan from './pages/karyawan/CreateKaryawan';
import EditKaryawan from './pages/karyawan/EditKaryawan';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes for Auth Users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/karyawan" element={<KaryawanList />} />
          <Route path="/karyawan/create" element={<CreateKaryawan />} />
          <Route path="/karyawan/edit/:id" element={<EditKaryawan />} />
          <Route path="/presensi" element={<div className="p-6">Panel Presensi</div>} />
          <Route path="/monitoring" element={<div className="p-6">Panel Monitoring</div>} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

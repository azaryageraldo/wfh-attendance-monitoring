import { useState, useEffect } from 'react';
import { Users, CheckCircle, Clock, XCircle, CalendarRange, Activity, User, Building, Briefcase, CalendarCheck } from 'lucide-react';
import { dashboardService, type DashboardStats, type KaryawanDashboardData } from '../../services/dashboard.service';
import { useAuth } from '../../context/AuthContext';
import Card, { CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Gagal mengambil data statistik dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500 animate-pulse">
        <Activity className="w-8 h-8 mx-auto mb-3 opacity-50 animate-spin" />
        <p>Memuat data statistik...</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Dashboard HR Admin</h1>
        <p className="text-sm text-slate-500 mt-1">
          Ringkasan statistik karyawan dan presensi WFH.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Karyawan */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Karyawan</p>
            <p className="text-2xl font-bold text-slate-800">{stats.totalKaryawan}</p>
          </div>
        </div>

        {/* Hadir Lengkap */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Hadir Lengkap</p>
            <p className="text-2xl font-bold text-slate-800">{stats.hariIni.hadirLengkap}</p>
          </div>
        </div>

        {/* Belum Checkout */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Belum Checkout</p>
            <p className="text-2xl font-bold text-slate-800">{stats.hariIni.belumCheckout}</p>
          </div>
        </div>

        {/* Tidak Hadir */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Tidak Hadir Hari Ini</p>
            <p className="text-2xl font-bold text-slate-800">{stats.hariIni.tidakHadir}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Stats Bulan Ini */}
        <Card padding="none">
           <div className="p-5 border-b border-slate-100">
             <CardHeader 
                title="Statistik Presensi Bulan Ini" 
                subtitle="Akumulasi kehadiran seluruh karyawan semenjak awal bulan"
             />
           </div>
           <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 flex items-center gap-3">
               <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                 <CalendarRange className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-xs font-medium text-slate-500 uppercase">Total Hadir</p>
                 <p className="text-xl font-bold text-slate-800">{stats.bulanIni.hadir}</p>
               </div>
             </div>
             
             <div className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 flex items-center gap-3">
               <div className="p-2.5 bg-red-100 text-red-600 rounded-lg">
                 <CalendarRange className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-xs font-medium text-slate-500 uppercase">Total Tidak Hadir</p>
                 <p className="text-xl font-bold text-slate-800">{stats.bulanIni.tidakHadir}</p>
               </div>
             </div>
           </div>
        </Card>
      </div>
    </div>
  );
}

function KaryawanDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<KaryawanDashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await dashboardService.getKaryawanStats();
        setData(res);
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Gagal mengambil data dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="py-20 text-center text-slate-500 animate-pulse">
        <Activity className="w-8 h-8 mx-auto mb-3 opacity-50 animate-spin" />
        <p>Memuat data karyawan...</p>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    if (status.includes('Selesai')) return <Badge variant="success" dot>{status}</Badge>;
    if (status.includes('Belum')) return <Badge variant="warning" dot>{status}</Badge>;
    return <Badge variant="danger" dot>{status}</Badge>;
  };

  const formatTime = (isoString?: string | null) => {
    if (!isoString) return '-';
    return format(new Date(isoString), 'HH:mm') + ' WIB';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Beranda Karyawan</h1>
        <p className="text-sm text-slate-500 mt-1">
          Pantau status presensi Anda hari ini dan kelola absensi harian dengan mudah.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Presensi Hari Ini */}
        <Card padding="none">
           <div className="p-5 border-b border-slate-100 flex justify-between items-center">
             <CardHeader 
                title="Status Kehadiran" 
                subtitle={`Hari ini, ${format(new Date(), 'dd MMMM yyyy')}`}
             />
             <div>{statusBadge(data.presensi.status)}</div>
           </div>
           
           <div className="p-6">
             <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100/50 text-blue-600 rounded-xl">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 border-b border-slate-200 pb-4">
                    <p className="text-xs font-semibold tracking-wider text-slate-400 mb-1 uppercase">Jam Masuk</p>
                    <p className="text-xl font-bold text-slate-800">{formatTime(data.presensi.checkInWaktu)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100/50 text-amber-600 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold tracking-wider text-slate-400 mb-1 uppercase">Jam Keluar</p>
                    <p className="text-xl font-bold text-slate-800">{formatTime(data.presensi.checkOutWaktu)}</p>
                  </div>
                </div>
             </div>
           </div>
        </Card>

        {/* Profil Karyawan */}
        <Card padding="none">
           <div className="p-5 border-b border-slate-100">
             <CardHeader 
                title="Informasi Karyawan" 
                subtitle="Data diri profil Anda saat ini"
             />
           </div>
           
           <div className="p-6 space-y-6">
              <div className="flex gap-4 items-center">
                <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xl shrink-0">
                  {data.user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">{data.user.name}</h3>
                  <p className="text-sm text-slate-500">{data.user.email}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Departemen</p>
                    <p className="text-sm font-semibold text-slate-700">{data.user.department || '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Posisi / Jabatan</p>
                    <p className="text-sm font-semibold text-slate-700">{data.user.position || '-'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Employee ID</p>
                    <p className="text-xs font-mono font-semibold text-slate-500 bg-slate-200 px-2 py-1 rounded mt-1 overflow-auto">{data.user.id}</p>
                  </div>
                </div>
              </div>
           </div>
        </Card>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  
  if (!user) return null;

  if (user.role === 'ADMIN_HR') {
    return <AdminDashboard />;
  }

  return <KaryawanDashboard />;
}

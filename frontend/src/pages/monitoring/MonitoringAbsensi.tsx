import { useState, useEffect, useCallback } from 'react';
import { Calendar, Activity } from 'lucide-react';
import { monitoringService, type MonitoringResponse } from '../../services/monitoring.service';
import MonitoringTable from '../../components/features/MonitoringTable';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function MonitoringAbsensi() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MonitoringResponse | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  const fetchData = useCallback(async (dateStr: string) => {
    try {
      setLoading(true);
      const res = await monitoringService.getMonitoring(dateStr);
      setData(res);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Gagal mengambil data monitoring');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate, fetchData]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleToday = () => {
    setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Monitoring Absensi</h1>
          <p className="text-sm text-slate-500 mt-1">
            Pantau kehadiran karyawan (Hadir / Tidak Hadir) per harinya.
          </p>
        </div>
        
        {/* Date Filter */}
        <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm self-start sm:self-auto">
          <button
            onClick={handleToday}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 border-r border-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Hari Ini</span>
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="px-4 py-2 text-sm text-slate-700 focus:outline-none focus:bg-slate-50 cursor-pointer w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500 animate-pulse">
          <Activity className="w-8 h-8 mx-auto mb-3 opacity-50 animate-spin" />
          <p>Memuat data monitoring...</p>
        </div>
      ) : data ? (
        <MonitoringTable summary={data.summary} records={data.data} />
      ) : (
        <div className="py-20 text-center text-slate-500">Data tidak ditemukan.</div>
      )}
    </div>
  );
}

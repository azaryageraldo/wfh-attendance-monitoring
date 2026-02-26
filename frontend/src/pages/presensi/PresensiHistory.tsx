import { useState, useEffect } from 'react';
import { Calendar, Image, FileText } from 'lucide-react';
import { presensiService } from '../../services/presensi.service';
import type { Presensi } from '../../services/presensi.service';
import toast from 'react-hot-toast';

export default function PresensiHistory() {
  const [data, setData] = useState<Presensi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await presensiService.getHistory();
        setData(res);
      } catch {
        toast.error('Gagal memuat riwayat presensi');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Riwayat Presensi</h1>
        <p className="text-sm text-slate-500 mt-1">Rekam jejak absensi WFH Anda.</p>
      </div>

      {loading ? (
        <div className="animate-pulse text-center text-slate-400 py-20">Memuat riwayat...</div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500">Belum ada riwayat presensi</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex gap-5 items-start"
            >
              {/* Thumbnail */}
              {item.photoUrl ? (
                <img
                  src={`http://localhost:3000${item.photoUrl}`}
                  alt="Bukti WFH"
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <Image className="w-6 h-6 text-slate-300" />
                </div>
              )}

              {/* Detail */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-800">
                    {new Date(item.tanggal).toLocaleDateString('id-ID', {
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">
                  Dicatat pukul {new Date(item.tanggal).toLocaleTimeString('id-ID', {
                    hour: '2-digit', minute: '2-digit'
                  })} WIB
                </p>
                {item.keterangan && (
                  <div className="flex items-start gap-1.5 text-sm text-slate-600 bg-slate-50 rounded-lg p-2.5">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{item.keterangan}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

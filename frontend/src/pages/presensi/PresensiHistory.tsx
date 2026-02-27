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
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
            >
              {/* Header Tanggal */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-bold text-slate-800">
                    {new Date(item.checkInWaktu).toLocaleDateString('id-ID', {
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </span>
                </div>
                <div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.checkOutWaktu ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.checkOutWaktu ? 'Selesai' : 'Belum Checkout'}
                  </span>
                </div>
              </div>

              {/* Grid CheckIn vs CheckOut */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Check In Column */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absen Masuk (Check-In)</h4>
                  <div className="flex gap-4 items-start">
                    {item.checkInPhotoUrl ? (
                      <img
                        src={`http://localhost:3000${item.checkInPhotoUrl}`}
                        alt="Bukti Check-In"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        <Image className="w-5 h-5 text-slate-300" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        {new Date(item.checkInWaktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                      </p>
                      {item.checkInKeterangan ? (
                        <div className="flex items-start gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-2 mt-2">
                          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{item.checkInKeterangan}</span>
                        </div>
                      ) : <p className="text-xs text-slate-400 mt-1">Tidak ada keterangan</p>}
                    </div>
                  </div>
                </div>

                {/* Check Out Column */}
                <div className="space-y-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absen Pulang (Check-Out)</h4>
                  {item.checkOutWaktu ? (
                    <div className="flex gap-4 items-start">
                      {item.checkOutPhotoUrl ? (
                        <img
                          src={`http://localhost:3000${item.checkOutPhotoUrl}`}
                          alt="Bukti Check-Out"
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                          <Image className="w-5 h-5 text-slate-300" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">
                          {new Date(item.checkOutWaktu).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                        </p>
                        {item.checkOutKeterangan ? (
                          <div className="flex items-start gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-2 mt-2">
                            <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                            <span>{item.checkOutKeterangan}</span>
                          </div>
                        ) : <p className="text-xs text-slate-400 mt-1">Tidak ada keterangan</p>}
                      </div>
                    </div>
                  ) : (
                    <div className="h-[64px] flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                      <p className="text-xs text-slate-400 text-center px-4">Belum melakukan absensi pulang</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { karyawanService } from '../../services/karyawan.service';
import type { CreateKaryawanDto } from '../../services/karyawan.service';
import KaryawanForm from '../../components/features/KaryawanForm';

export default function CreateKaryawan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateKaryawanDto) => {
    try {
      setLoading(true);
      await karyawanService.create(data);
      toast.success('Berhasil mendaftarkan karyawan baru');
      navigate('/karyawan');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/karyawan')}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-500"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Tambah Karyawan Baru</h1>
          <p className="text-sm text-slate-500 mt-1">
            Isi formulir di bawah ini untuk mendaftarkan akun pegawai baru.
          </p>
        </div>
      </div>

      <KaryawanForm onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
}

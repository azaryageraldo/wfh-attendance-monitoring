import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { karyawanService } from '../../services/karyawan.service';
import type { CreateKaryawanDto, Karyawan } from '../../services/karyawan.service';
import KaryawanForm from '../../components/features/KaryawanForm';

export default function EditKaryawan() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState<Partial<CreateKaryawanDto>>();

  useEffect(() => {
    if (!id) return;
    const loadKaryawan = async () => {
      try {
        const data: Karyawan = await karyawanService.getById(id);
        setInitialData({
          name: data.name,
          email: data.email,
          department: data.department || '',
          position: data.position || '',
        });
      } catch (err) {
        toast.error('Gagal mengambil detail karyawan');
        navigate('/karyawan');
      } finally {
        setFetching(false);
      }
    };
    loadKaryawan();
  }, [id, navigate]);

  const handleSubmit = async (data: CreateKaryawanDto) => {
    if (!id) return;
    try {
      setLoading(true);
      await karyawanService.update(id, data);
      toast.success('Data karyawan berhasil diperbarui');
      navigate('/karyawan');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Gagal menyimpan pembaruan');
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
          <h1 className="text-2xl font-bold text-slate-800">Edit Profil Karyawan</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ubah identitas, penempatan divisi, dan atur ulang kata sandi pegawai.
          </p>
        </div>
      </div>

      {fetching ? (
        <div className="p-12 text-center text-slate-500 animate-pulse">
          Memuat data...
        </div>
      ) : (
        <KaryawanForm 
          initialData={initialData} 
          onSubmit={handleSubmit} 
          isLoading={loading} 
          isEdit={true} 
        />
      )}
    </div>
  );
}

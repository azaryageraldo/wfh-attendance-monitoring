import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Building2, Briefcase } from 'lucide-react';
import { karyawanService } from '../../services/karyawan.service';
import type { Karyawan } from '../../services/karyawan.service';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card, { CardHeader } from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import toast from 'react-hot-toast';

export default function KaryawanList() {
  const navigate = useNavigate();
  const [data, setData] = useState<Karyawan[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [karyawanToDelete, setKaryawanToDelete] = useState<{ id: string; name: string } | null>(null);

  const fetchKaryawan = async () => {
    try {
      setLoading(true);
      const res = await karyawanService.getAll();
      setData(res);
    } catch (err) {
      toast.error('Gagal mengambil data karyawan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const openDeleteModal = (id: string, name: string) => {
    setKaryawanToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setKaryawanToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!karyawanToDelete) return;
    
    try {
      await karyawanService.delete(karyawanToDelete.id);
      toast.success('Data karyawan berhasil dihapus');
      fetchKaryawan(); // refresh tabel
    } catch (err) {
      toast.error('Gagal menghapus data karyawan');
    } finally {
      closeDeleteModal();
    }
  };

  const filteredData = data.filter(
    (k) =>
      k.name.toLowerCase().includes(search.toLowerCase()) ||
      k.email.toLowerCase().includes(search.toLowerCase()) ||
      k.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Master Karyawan</h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola data pegawai, divisi, dan peran dalam perusahaan.
          </p>
        </div>
      </div>

      <Card padding="none">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <CardHeader
            title="Daftar Karyawan"
            subtitle="Semua data karyawan terdaftar di sistem"
            action={
              <Button onClick={() => navigate('/karyawan/create')} size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Tambah Karyawan
              </Button>
            }
          />

          <div className="flex mt-4 max-w-md">
            <Input
              placeholder="Cari nama, email, atau divisi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 min-w-[700px]">
            <thead className="bg-slate-50 border-y border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Nama & Email</th>
                <th className="px-6 py-4">Departemen</th>
                <th className="px-6 py-4">Jabatan</th>
                <th className="px-6 py-4">Tanggal Daftar</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    Memuat data karyawan...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    Tidak ada data ditemukan
                  </td>
                </tr>
              ) : (
                filteredData.map((karyawan) => (
                  <tr key={karyawan.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{karyawan.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{karyawan.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        {karyawan.department || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-slate-400" />
                        {karyawan.position || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(karyawan.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/karyawan/edit/${karyawan.id}`)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(karyawan.id, karyawan.name)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Hapus Data Karyawan"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={closeDeleteModal}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Hapus Data
            </Button>
          </>
        }
      >
        <p className="text-slate-600">
          Apakah Anda yakin ingin menghapus data{' '}
          <span className="font-semibold text-slate-800">{karyawanToDelete?.name}</span>? 
          Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Clock, CheckCircle, FileText, X } from 'lucide-react';
import { presensiService } from '../../services/presensi.service';
import type { TodayStatus } from '../../services/presensi.service';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import toast from 'react-hot-toast';

export default function PresensiPage() {
  const [loading, setLoading] = useState(false);
  const [todayStatus, setTodayStatus] = useState<TodayStatus | null>(null);
  const [fetching, setFetching] = useState(true);
  const [keterangan, setKeterangan] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    checkTodayStatus();
    return () => stopCamera();
  }, []);

  const checkTodayStatus = async () => {
    try {
      const status = await presensiService.getTodayStatus();
      setTodayStatus(status);
    } catch {
      // ignore
    } finally {
      setFetching(false);
    }
  };

  /* ========== Camera ========== */
  const startCamera = async () => {
    try {
      setCameraOpen(true); // render video element dulu
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      // Attach after React renders the video element
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      });
    } catch {
      setCameraOpen(false);
      toast.error('Tidak dapat mengakses kamera. Pastikan izin kamera sudah diberikan.');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          setSelectedFile(file);
          setPreview(canvas.toDataURL('image/jpeg'));
          stopCamera();
        }
      },
      'image/jpeg',
      0.85,
    );
  };

  /* ========== File Upload ========== */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file maksimal 5MB');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearPhoto = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  /* ========== Submit ========== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Silakan ambil foto atau upload bukti WFH terlebih dahulu');
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('photo', selectedFile);
      if (keterangan) formData.append('keterangan', keterangan);
      await presensiService.submit(formData);
      toast.success('Absensi berhasil dicatat!');
      checkTodayStatus();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Gagal melakukan absensi');
    } finally {
      setLoading(false);
    }
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  if (fetching) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="animate-pulse text-center text-slate-400 py-20">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Presensi WFH</h1>
        <p className="text-sm text-slate-500 mt-1">Catat kehadiran harian Anda dengan bukti foto.</p>
      </div>

      {/* Date & Time Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-slate-300" />
          <span className="text-sm text-slate-300">Hari ini</span>
        </div>
        <p className="text-xl font-semibold">{dateStr}</p>
        <p className="text-3xl font-bold mt-1">{timeStr} WIB</p>
      </div>

      {todayStatus?.hadir ? (
        /* Already checked in */
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-800">Absensi Hari Ini Tercatat</h3>
              <p className="text-sm text-emerald-600">
                Dicatat pada{' '}
                {new Date(todayStatus.data!.tanggal).toLocaleTimeString('id-ID', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                WIB
              </p>
            </div>
          </div>
          {todayStatus.data?.photoUrl && (
            <img
              src={`http://localhost:3000${todayStatus.data.photoUrl}`}
              alt="Bukti WFH"
              className="w-full rounded-xl mt-3 border border-emerald-200"
            />
          )}
          {todayStatus.data?.keterangan && (
            <p className="mt-3 text-sm text-emerald-700 bg-emerald-100 rounded-lg p-3">
              <FileText className="w-4 h-4 inline mr-1" />
              {todayStatus.data.keterangan}
            </p>
          )}
        </div>
      ) : (
        /* Attendance Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <h3 className="font-semibold text-slate-800 text-lg">Form Absensi</h3>

          {/* Photo Section */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Foto Bukti WFH <span className="text-red-500">*</span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <canvas ref={canvasRef} className="hidden" />

            {cameraOpen ? (
              /* Camera Viewfinder — full width, aspect-ratio 16:9 */
              <div className="relative rounded-xl overflow-hidden border-2 border-blue-400 bg-black" style={{ aspectRatio: '16/9' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Overlay controls */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-center gap-4">
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                    title="Batal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="w-16 h-16 rounded-full bg-white border-4 border-white/50 shadow-lg hover:scale-105 transition-transform flex items-center justify-center cursor-pointer"
                    title="Ambil Foto"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </button>
                  <div className="w-10 h-10" /> {/* spacer for centering */}
                </div>
              </div>
            ) : preview ? (
              /* Preview — full width, natural aspect ratio */
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full rounded-xl"
                />
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                  title="Hapus foto"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Picker: Camera or Upload */
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={startCamera}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                >
                  <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                  <p className="text-sm font-medium text-slate-600 group-hover:text-blue-600">Ambil Foto</p>
                  <p className="text-xs text-slate-400 mt-1">Gunakan kamera</p>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-slate-400 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-slate-600 transition-colors" />
                  <p className="text-sm font-medium text-slate-600">Upload File</p>
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG (maks. 5MB)</p>
                </button>
              </div>
            )}
          </div>

          {/* Keterangan */}
          <Input
            label="Keterangan (Opsional)"
            placeholder="Contoh: Mengerjakan fitur X dari rumah"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            leftIcon={<FileText className="w-4 h-4" />}
          />

          <Button type="submit" isLoading={loading} size="lg" className="w-full">
            <CheckCircle className="w-4 h-4 mr-2" />
            Absen Sekarang
          </Button>
        </form>
      )}
    </div>
  );
}

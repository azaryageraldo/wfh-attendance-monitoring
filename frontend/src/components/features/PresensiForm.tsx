import { useState, useRef } from 'react';
import { Camera, Upload, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';

export default function PresensiForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [keterangan, setKeterangan] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const now = new Date();
  const formattedDate = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrors({});
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!selectedFile) {
      newErrors.photo = 'Foto bukti WFH wajib diupload';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // TODO: integrate with presensi service
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="text-center">
          <div className="py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Absensi Berhasil! ✅
            </h3>
            <p className="text-slate-500 mb-1">{formattedDate}</p>
            <p className="text-2xl font-bold text-blue-600">{formattedTime}</p>
            <p className="text-sm text-slate-400 mt-4">
              Data absensi Anda telah tercatat dalam sistem.
            </p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => {
                setIsSuccess(false);
                setSelectedFile(null);
                setPreview(null);
                setKeterangan('');
              }}
            >
              Absensi Lagi
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card>
        <CardHeader
          title="Absensi WFH"
          subtitle="Upload foto bukti kerja dari rumah dan catat kehadiran"
        />

        {/* Date & Time Display */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-blue-500 font-medium uppercase tracking-wider">Tanggal</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">{formattedDate}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-blue-500 font-medium uppercase tracking-wider">Waktu</p>
              <p className="text-2xl font-bold text-blue-600 mt-0.5">{formattedTime}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Foto Bukti WFH <span className="text-red-400">*</span>
            </label>

            {preview ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200">
                <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => fileRef.current?.click()}
                    leftIcon={<Camera className="w-4 h-4" />}
                  >
                    Ganti Foto
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
                  {selectedFile?.name}
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className={`
                  w-full h-48 rounded-xl border-2 border-dashed
                  flex flex-col items-center justify-center gap-3
                  transition-all duration-200 cursor-pointer
                  ${errors.photo
                    ? 'border-red-300 bg-red-50/50 hover:bg-red-50'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 hover:border-blue-300'
                  }
                `}
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-600">Klik untuk upload foto</p>
                  <p className="text-xs text-slate-400 mt-0.5">JPG, PNG (maks. 5MB)</p>
                </div>
              </button>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {errors.photo && (
              <p className="mt-1 text-xs text-red-500">{errors.photo}</p>
            )}
          </div>

          {/* Keterangan */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Keterangan <span className="text-slate-400">(opsional)</span>
            </label>
            <textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Contoh: Mengerjakan project X dari rumah"
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 hover:border-slate-300 resize-none"
            />
          </div>

          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full"
            size="lg"
            leftIcon={<Camera className="w-4 h-4" />}
          >
            Submit Absensi
          </Button>
        </form>
      </Card>
    </div>
  );
}

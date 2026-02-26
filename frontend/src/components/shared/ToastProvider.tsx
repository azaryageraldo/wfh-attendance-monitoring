import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: 'text-sm font-medium shadow-xl shadow-slate-900/10 border border-slate-100',
        style: {
          background: '#fff',
          color: '#1e293b', // slate-800
          borderRadius: '12px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: '#10b981', // emerald-500
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444', // red-500
            secondary: '#fff',
          },
        },
      }}
    />
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/auth.service';
import LoginForm from '../../components/features/LoginForm';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      login(response.token, response.user);
      
      toast.success('Login berhasil! Selamat datang.', {
        position: 'top-right',
      });
      
      // Redirect based on role
      if (response.user.role === 'ADMIN_HR') {
        navigate('/'); // Go to standard dashboard for now
      } else {
        navigate('/presensi'); // Employee default route
      }
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || 'Gagal terhubung ke server.';
      toast.error(msg, { position: 'top-right' });
      throw error; // Rethrow to let LoginForm caught it and display inline error
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={handleLogin} isLoading={isLoading} />;
}

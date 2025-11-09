'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';
import { apiService } from '@/services';

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegisterModal({ open, onOpenChange }: RegisterModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      setError('Şifreler eşleşmiyor!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır!');
      return;
    }

    try {
      setLoading(true);
      await apiService.register({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });

      // After registration, login automatically
      const loginResponse = await apiService.login(formData.email, formData.password);
      if (loginResponse.access_token) {
        localStorage.setItem('auth_token', loginResponse.access_token);
        onOpenChange(false);
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message || 'Kayıt olunamadı. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Kayıt Ol
          </DialogTitle>
          <DialogDescription className="text-center">
            Yeni hesap oluşturun
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Ad Soyad</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ahmet Yılmaz"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500">En az 6 karakter</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passwordConfirm">Şifre Tekrar</Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="••••••••"
              value={formData.passwordConfirm}
              onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{' '}
          <button
            onClick={() => {
              onOpenChange(false);
              router.push('/login');
            }}
            className="text-primary hover:underline"
          >
            Giriş Yapın
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

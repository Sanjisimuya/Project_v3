import { useState, type FormEvent } from 'react';
import { useLogin, useRegister } from '@workspace/api-client-react';
import { useToast } from '@/hooks/use-toast';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.2-.1-2.5-.4-3.5z"
        fill="#FFC107"
      />
      <path
        d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 7.1 29.5 4.5 24 4.5 16.3 4.5 9.7 8.7 6.3 14.7z"
        fill="#FF3D00"
      />
      <path
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.4C9.8 35.8 16.3 40 24 40v4z"
        fill="#4CAF50"
      />
      <path
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C37.1 38.7 44 33 44 24c0-1.2-.1-2.5-.4-3.5z"
        fill="#1976D2"
      />
    </svg>
  );
}

export function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const pending = loginMutation.isPending || registerMutation.isPending;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (mode === 'login') {
      loginMutation.mutate(
        { data: { email, password } },
        {
          onError: (err) => {
            toast({
              title: 'Gagal masuk',
              description:
                (err as { data?: { error?: string } })?.data?.error ??
                'Email atau password salah',
              variant: 'destructive',
            });
          },
        },
      );
    } else {
      registerMutation.mutate(
        { data: { name, email, password } },
        {
          onError: (err) => {
            toast({
              title: 'Gagal mendaftar',
              description:
                (err as { data?: { error?: string } })?.data?.error ??
                'Terjadi kesalahan, coba lagi',
              variant: 'destructive',
            });
          },
        },
      );
    }
  };

  const handleGoogleClick = () => {
    toast({
      title: 'Segera hadir',
      description: 'Login dengan Google belum tersedia. Gunakan email & password ya.',
    });
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full"
      style={{ background: 'linear-gradient(160deg, #fce7f3 0%, #f0fdf4 100%)' }}
    >
      <div className="mb-2 flex flex-col items-center">
        <div
          className="rounded-2xl overflow-hidden shadow-md mb-3"
          style={{ width: 80, height: 80, background: '#fff' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            <source src={`${import.meta.env.BASE_URL}mascot.webm`} type="video/webm" />
            <source src={`${import.meta.env.BASE_URL}mascot_web.mp4`} type="video/mp4" />
          </video>
        </div>
        <h1
          className="text-gray-900"
          style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}
        >
          DompetKu
        </h1>
        <p className="text-gray-400 mt-0.5" style={{ fontSize: '0.78rem' }}>
          Catat daily expense mu
        </p>
      </div>

      <div
        className="w-full mx-5 bg-white rounded-3xl shadow-lg overflow-hidden"
        style={{ maxWidth: 360, margin: '0 20px' }}
      >
        <div className="flex border-b border-gray-100">
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-3.5 transition-colors"
              style={{
                fontSize: '0.875rem',
                fontWeight: mode === m ? 700 : 400,
                color: mode === m ? '#16a34a' : '#9ca3af',
                borderBottom: mode === m ? '2px solid #16a34a' : '2px solid transparent',
              }}
            >
              {m === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-3">
          {mode === 'register' && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
              required
              className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none text-gray-800 border border-transparent focus:border-green-300 transition-colors"
              style={{ fontSize: '0.875rem' }}
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none text-gray-800 border border-transparent focus:border-green-300 transition-colors"
            style={{ fontSize: '0.875rem' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className="w-full bg-gray-50 rounded-xl px-4 py-3 outline-none text-gray-800 border border-transparent focus:border-green-300 transition-colors"
            style={{ fontSize: '0.875rem' }}
          />

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3 rounded-xl text-white font-semibold mt-1 active:opacity-90 transition-opacity disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              boxShadow: '0 4px 14px rgba(34,197,94,0.35)',
              fontSize: '0.9rem',
            }}
          >
            {pending ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Buat Akun'}
          </button>
        </form>

        <div className="px-6 pb-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-300" style={{ fontSize: '0.72rem' }}>
              atau
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <button
            onClick={handleGoogleClick}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors"
            style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}
          >
            <GoogleIcon />
            Lanjutkan dengan Google
          </button>
        </div>
      </div>
    </div>
  );
}

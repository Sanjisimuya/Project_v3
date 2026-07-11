import { useState } from 'react';
import { Smartphone } from 'lucide-react';

function MeSectionHeader({ title }: { title: string }) {
  return (
    <p
      className="text-gray-400 px-5 mb-2 mt-5"
      style={{
        fontSize: '0.7rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}
    >
      {title}
    </p>
  );
}

interface SettingsViewProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

export function SettingsView({ userName, userEmail, onLogout }: SettingsViewProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [rated, setRated] = useState(false);

  const initial = userName.trim() ? userName.trim()[0].toUpperCase() : '?';

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      <div className="px-5 pt-10 pb-5 bg-white border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-gray-900" style={{ fontWeight: 700 }}>
          Me
        </h1>
      </div>

      <div className="mx-5 mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shrink-0">
            <span className="text-white" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              {initial}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 truncate" style={{ fontWeight: 700 }}>
              {userName}
            </p>
            <p className="text-gray-400 truncate" style={{ fontSize: '0.8rem' }}>
              {userEmail}
            </p>
          </div>
        </div>
      </div>

      <MeSectionHeader title="Rating Aplikasi" />
      <div className="mx-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <p className="text-gray-700 mb-1" style={{ fontWeight: 600 }}>
          Beri Rating Aplikasi
        </p>
        <p className="text-gray-400 mb-4" style={{ fontSize: '0.78rem' }}>
          Bagaimana pengalaman kamu?
        </p>
        <div className="flex gap-2 justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => !rated && setHoverRating(star)}
              onMouseLeave={() => !rated && setHoverRating(0)}
              onClick={() => {
                setRating(star);
                setRated(true);
              }}
              style={{
                fontSize: '2rem',
                transition: 'transform 0.15s',
                transform: (hoverRating || rating) >= star ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              <span style={{ color: (hoverRating || rating) >= star ? '#f59e0b' : '#e5e7eb' }}>★</span>
            </button>
          ))}
        </div>
        {rated ? (
          <p className="text-center text-green-600" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
            Terima kasih atas rating {rating} bintang! 🎉
          </p>
        ) : (
          <p className="text-center text-gray-300" style={{ fontSize: '0.78rem' }}>
            Ketuk bintang untuk memberi rating
          </p>
        )}
      </div>

      <MeSectionHeader title="Hubungi Pembuat" />
      <div className="mx-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-green-50 shrink-0">
            <Smartphone size={18} className="text-green-500" />
          </div>
          <div className="flex-1">
            <p className="text-gray-800" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
              WhatsApp / Telepon
            </p>
            <p className="text-green-600" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              085185033441
            </p>
          </div>
        </div>
      </div>

      <MeSectionHeader title="Akun" />
      <div className="mx-5 mb-6">
        <button
          onClick={onLogout}
          className="w-full py-3.5 rounded-2xl border-2 border-red-200 text-red-500 font-semibold transition-colors hover:bg-red-50 active:bg-red-100"
          style={{ fontSize: '0.9rem' }}
        >
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
}

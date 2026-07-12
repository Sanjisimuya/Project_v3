import { useEffect, useRef } from 'react';

export function DogAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <div
      className="w-full flex items-center justify-center relative overflow-hidden"
      style={{
        height: '150px',
        background:
          'linear-gradient(180deg, #fce7f3 0%, #fdf2f8 60%, #f0fdf4 100%)',
      }}
    >
      <style>{`
        @keyframes floatText {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(-4px); opacity: 0.85; }
        }
        @keyframes starPop {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.3) rotate(20deg); opacity: 1; }
        }
        .float-text { animation: floatText 1.5s ease-in-out infinite; }
        .star  { animation: starPop 1.2s ease-in-out infinite; }
        .star2 { animation: starPop 1.2s ease-in-out infinite 0.4s; }
        .star3 { animation: starPop 1.2s ease-in-out infinite 0.8s; }
      `}</style>

      <div className="absolute star" style={{ top: 10, left: 30 }}>
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path
            fill="#f9a8d4"
            d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
          />
        </svg>
      </div>
      <div className="absolute star2" style={{ top: 16, right: 40 }}>
        <svg width="10" height="10" viewBox="0 0 24 24">
          <path
            fill="#86efac"
            d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
          />
        </svg>
      </div>
      <div className="absolute star3" style={{ top: 38, left: 56 }}>
        <svg width="8" height="8" viewBox="0 0 24 24">
          <path
            fill="#fcd34d"
            d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
          />
        </svg>
      </div>
      <div className="absolute star2" style={{ top: 12, right: 66 }}>
        <span style={{ fontSize: '0.9rem', display: 'block' }}>💸</span>
      </div>
      <div className="absolute star3" style={{ top: 34, left: 36 }}>
        <span style={{ fontSize: '0.7rem', display: 'block' }}>✨</span>
      </div>

      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: 20,
          overflow: 'hidden',
          background: '#fff',
          boxShadow: '0 4px 16px rgba(249,168,212,0.35)',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        >
          <source src={`${import.meta.env.BASE_URL}mascot.webm`} type="video/webm" />
          <source src={`${import.meta.env.BASE_URL}mascot_web.mp4`} type="video/mp4" />
        </video>
      </div>

      <div className="float-text absolute" style={{ top: 6, right: 20 }}>
        <div
          className="bg-white rounded-2xl px-3 py-1.5 shadow-md relative"
          style={{ fontSize: '0.72rem', color: '#be185d', fontWeight: 600 }}
        >
          <span>( •ω•) 💕</span>
          <div
            className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white"
            style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          />
        </div>
      </div>
    </div>
  );
}

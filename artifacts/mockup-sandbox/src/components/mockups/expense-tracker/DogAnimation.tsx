export function DogAnimation() {
  return (
    <div
      className="w-full flex items-center justify-center relative overflow-hidden"
      style={{ height: "220px", background: "linear-gradient(180deg, #fce7f3 0%, #fdf2f8 60%, #f0fdf4 100%)" }}
    >
      <style>{`
        @keyframes mascotBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatText {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(-4px); opacity: 0.85; }
        }
        @keyframes starPop {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.3) rotate(20deg); opacity: 1; }
        }
        @keyframes shadowPulse {
          0%, 100% { transform: scaleX(1); opacity: 0.18; }
          50% { transform: scaleX(0.72); opacity: 0.09; }
        }
        .mascot-body { animation: mascotBounce 1s ease-in-out infinite; }
        .float-text  { animation: floatText 1.5s ease-in-out infinite; }
        .star        { animation: starPop 1.2s ease-in-out infinite; }
        .star2       { animation: starPop 1.2s ease-in-out infinite 0.4s; }
        .star3       { animation: starPop 1.2s ease-in-out infinite 0.8s; }
        .mascot-shadow { animation: shadowPulse 1s ease-in-out infinite; }
      `}</style>

      {/* decorative stars */}
      <div className="absolute star"  style={{ top: 18, left: 36 }}>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#f9a8d4" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      </div>
      <div className="absolute star2" style={{ top: 28, right: 48 }}>
        <svg width="11" height="11" viewBox="0 0 24 24">
          <path fill="#86efac" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      </div>
      <div className="absolute star3" style={{ top: 60, left: 72 }}>
        <svg width="9" height="9" viewBox="0 0 24 24">
          <path fill="#fcd34d" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      </div>
      <div className="absolute star2" style={{ top: 22, right: 82 }}>
        <span style={{ fontSize: "1rem", display: "block" }}>💸</span>
      </div>
      <div className="absolute star3" style={{ top: 52, left: 46 }}>
        <span style={{ fontSize: "0.8rem", display: "block" }}>✨</span>
      </div>

      {/* mascot */}
      <div className="mascot-body flex flex-col items-center" style={{ marginTop: 8 }}>
        <img
          src="/__mockup/mascot.jpg"
          alt="mascot"
          style={{
            width: 148,
            height: 148,
            objectFit: "contain",
            imageRendering: "pixelated",
            filter: "drop-shadow(0 4px 8px rgba(249,168,212,0.45))",
          }}
        />
        {/* ground shadow */}
        <div
          className="mascot-shadow"
          style={{
            width: 80,
            height: 10,
            borderRadius: "50%",
            background: "rgba(236,72,153,0.18)",
            marginTop: -4,
          }}
        />
      </div>

      {/* speech bubble */}
      <div className="float-text absolute" style={{ top: 14, right: 28 }}>
        <div
          className="bg-white rounded-2xl px-3 py-1.5 shadow-md relative"
          style={{ fontSize: "0.75rem", color: "#be185d", fontWeight: 600 }}
        >
          <span>( •ω•) 💕</span>
          <div
            className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        </div>
      </div>
    </div>
  );
}

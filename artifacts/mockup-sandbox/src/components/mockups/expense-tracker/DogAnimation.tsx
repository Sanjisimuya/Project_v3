export function DogAnimation() {
  return (
    <div
      className="w-full flex items-center justify-center relative overflow-hidden"
      style={{ height: "220px", background: "linear-gradient(180deg, #bbf7d0 0%, #f0fdf4 100%)" }}
    >
      <style>{`
        @keyframes dogBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes tailWag {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(30deg); }
        }
        @keyframes earWiggle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes eyeBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes tongueBob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(3px) rotate(5deg); }
        }
        @keyframes legSwing {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes groundBob {
          0%, 100% { transform: scaleX(1); opacity: 0.3; }
          50% { transform: scaleX(0.7); opacity: 0.15; }
        }
        @keyframes floatText {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(-4px); opacity: 0.8; }
        }
        @keyframes starPop {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.6; }
          50% { transform: scale(1.3) rotate(20deg); opacity: 1; }
        }
        .dog-body { animation: dogBounce 0.8s ease-in-out infinite; }
        .dog-tail { transform-origin: 0% 50%; animation: tailWag 0.4s ease-in-out infinite; }
        .dog-ear { transform-origin: 50% 0%; animation: earWiggle 0.8s ease-in-out infinite; }
        .dog-eye { animation: eyeBlink 3s ease-in-out infinite; transform-origin: 50% 50%; }
        .dog-tongue { animation: tongueBob 0.4s ease-in-out infinite; transform-origin: 50% 0%; }
        .dog-leg-front { transform-origin: 50% 0%; animation: legSwing 0.4s ease-in-out infinite; }
        .dog-leg-back { transform-origin: 50% 0%; animation: legSwing 0.4s ease-in-out infinite reverse; }
        .ground-shadow { animation: groundBob 0.8s ease-in-out infinite; }
        .float-text { animation: floatText 1.5s ease-in-out infinite; }
        .star { animation: starPop 1.2s ease-in-out infinite; }
        .star2 { animation: starPop 1.2s ease-in-out infinite 0.4s; }
        .star3 { animation: starPop 1.2s ease-in-out infinite 0.8s; }
      `}</style>

      <div className="absolute" style={{ top: 20, left: 40 }}>
        <svg className="star" width="18" height="18" viewBox="0 0 24 24">
          <path fill="#fbbf24" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      </div>
      <div className="absolute" style={{ top: 30, right: 50 }}>
        <svg className="star2" width="12" height="12" viewBox="0 0 24 24">
          <path fill="#86efac" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      </div>
      <div className="absolute" style={{ top: 60, left: 80 }}>
        <svg className="star3" width="10" height="10" viewBox="0 0 24 24">
          <path fill="#fcd34d" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
        </svg>
      </div>

      <div className="absolute" style={{ top: 25, right: 80 }}>
        <span className="star2" style={{ fontSize: "1.1rem", display: "block" }}>💚</span>
      </div>
      <div className="absolute" style={{ top: 55, left: 50 }}>
        <span className="star3" style={{ fontSize: "0.8rem", display: "block" }}>✨</span>
      </div>

      <div className="dog-body flex flex-col items-center">
        <svg width="170" height="140" viewBox="0 0 170 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className="dog-tail" style={{ transformOrigin: "55px 85px" }}>
            <ellipse cx="40" cy="78" rx="18" ry="10" fill="#f97316" transform="rotate(-30 40 78)" />
            <ellipse cx="28" cy="70" rx="10" ry="7" fill="#fdba74" transform="rotate(-30 28 70)" />
          </g>
          <ellipse cx="95" cy="95" rx="40" ry="30" fill="#f97316" />
          <ellipse cx="95" cy="92" rx="32" ry="22" fill="#fb923c" />
          <ellipse cx="95" cy="100" rx="20" ry="14" fill="#fed7aa" />
          <g className="dog-leg-back" style={{ transformOrigin: "75px 110px" }}>
            <rect x="68" y="108" width="14" height="26" rx="7" fill="#f97316" />
            <ellipse cx="75" cy="134" rx="10" ry="6" fill="#ea580c" />
          </g>
          <g className="dog-leg-back" style={{ transformOrigin: "88px 110px" }}>
            <rect x="81" y="110" width="14" height="24" rx="7" fill="#fb923c" />
            <ellipse cx="88" cy="134" rx="10" ry="6" fill="#f97316" />
          </g>
          <g className="dog-leg-front" style={{ transformOrigin: "112px 110px" }}>
            <rect x="105" y="108" width="14" height="26" rx="7" fill="#f97316" />
            <ellipse cx="112" cy="134" rx="10" ry="6" fill="#ea580c" />
          </g>
          <g className="dog-leg-front" style={{ transformOrigin: "125px 110px" }}>
            <rect x="118" y="110" width="14" height="24" rx="7" fill="#fb923c" />
            <ellipse cx="125" cy="134" rx="10" ry="6" fill="#f97316" />
          </g>
          <ellipse cx="110" cy="75" rx="20" ry="16" fill="#f97316" />
          <circle cx="118" cy="58" r="30" fill="#f97316" />
          <circle cx="118" cy="60" r="24" fill="#fb923c" />
          <ellipse cx="130" cy="68" rx="14" ry="10" fill="#fed7aa" />
          <ellipse cx="136" cy="64" rx="6" ry="4" fill="#1c1917" />
          <circle cx="134" cy="63" r="1.5" fill="white" />
          <path d="M125 72 Q130 76 136 72" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <g className="dog-tongue" style={{ transformOrigin: "130px 74px" }}>
            <ellipse cx="130" cy="78" rx="6" ry="7" fill="#f43f5e" />
            <ellipse cx="130" cy="81" rx="5" ry="4" fill="#fb7185" />
            <line x1="130" y1="74" x2="130" y2="84" stroke="#e11d48" strokeWidth="1" />
          </g>
          <g className="dog-ear" style={{ transformOrigin: "100px 36px" }}>
            <ellipse cx="100" cy="42" rx="14" ry="18" fill="#ea580c" transform="rotate(-15 100 42)" />
            <ellipse cx="100" cy="44" rx="9" ry="13" fill="#fed7aa" transform="rotate(-15 100 44)" />
          </g>
          <g className="dog-ear" style={{ transformOrigin: "136px 36px", animationDelay: "0.2s" }}>
            <ellipse cx="136" cy="40" rx="13" ry="17" fill="#ea580c" transform="rotate(15 136 40)" />
            <ellipse cx="136" cy="42" rx="8" ry="12" fill="#fed7aa" transform="rotate(15 136 42)" />
          </g>
          <g className="dog-eye" style={{ transformOrigin: "108px 55px" }}>
            <circle cx="108" cy="55" r="8" fill="white" />
            <circle cx="110" cy="55" r="5" fill="#1c1917" />
            <circle cx="111" cy="53" r="2" fill="white" />
          </g>
          <g className="dog-eye" style={{ transformOrigin: "124px 53px", animationDelay: "0.1s" }}>
            <circle cx="124" cy="53" r="7" fill="white" />
            <circle cx="126" cy="53" r="4.5" fill="#1c1917" />
            <circle cx="127" cy="51" r="1.5" fill="white" />
          </g>
          <path d="M104 46 Q108 43 113 45" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M121 44 Q124 41 128 43" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" fill="none" />
          <rect x="96" y="81" width="34" height="8" rx="4" fill="#16a34a" />
          <circle cx="113" cy="85" r="3" fill="#fbbf24" />
          <circle cx="82" cy="88" r="6" fill="#ea580c" opacity="0.5" />
          <circle cx="105" cy="82" r="4" fill="#ea580c" opacity="0.4" />
        </svg>
        <ellipse className="ground-shadow" cx="95" cy="8" rx="45" ry="8" fill="#16a34a" />
      </div>

      <div className="float-text absolute" style={{ top: 16, right: 30 }}>
        <div className="bg-white rounded-2xl px-3 py-1.5 shadow-md relative" style={{ fontSize: "0.75rem" }}>
          <span>Woof! 🐾</span>
          <div
            className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          />
        </div>
      </div>
    </div>
  );
}

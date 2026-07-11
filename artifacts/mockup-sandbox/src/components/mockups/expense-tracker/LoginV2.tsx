/**
 * V2 — Interaction / Affordance Visibility
 * Tradeoff: Every interactive element looks and feels tappable.
 * Large 52px touch targets, visible password toggle, animated input
 * borders on focus, strong CTA button with emoji cue.
 * Slightly less visual hierarchy — interaction feel wins over structure.
 */
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
      <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.2-.1-2.5-.4-3.5z" fill="#FFC107"/>
      <path d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 7.1 29.5 4.5 24 4.5 16.3 4.5 9.7 8.7 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.4C9.8 35.8 16.3 40 24 40v4z" fill="#4CAF50"/>
      <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C37.1 38.7 44 33 44 24c0-1.2-.1-2.5-.4-3.5z" fill="#1976D2"/>
    </svg>
  );
}

export function LoginV2() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto"
      style={{ background:"linear-gradient(160deg,#fce7f3 0%,#f0fdf4 100%)", fontFamily:"system-ui,sans-serif" }}>

      {/* Header */}
      <div className="flex flex-col items-center pt-12 pb-6">
        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg mb-4 bg-white"
          style={{ boxShadow:"0 8px 32px rgba(249,168,212,0.4)" }}>
          <video autoPlay loop muted playsInline style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}>
            <source src="/__mockup/mascot.webm" type="video/webm"/>
            <source src="/__mockup/mascot_web.mp4" type="video/mp4"/>
          </video>
        </div>
        <h1 style={{ fontSize:"1.5rem", fontWeight:800, color:"#111827" }}>DompetKu</h1>
      </div>

      {/* Card */}
      <div className="mx-5 bg-white rounded-3xl shadow-xl px-6 py-6 mb-6"
        style={{ boxShadow:"0 20px 60px rgba(0,0,0,0.12)" }}>

        {/* Big pill tabs — very tappable */}
        <div className="flex gap-2 mb-6">
          {(["login","register"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="flex-1 py-3.5 rounded-2xl transition-all"
              style={{ fontSize:"0.9rem", fontWeight:700,
                background: mode===m ? "#16a34a" : "#f3f4f6",
                color: mode===m ? "#fff" : "#6b7280",
                boxShadow: mode===m ? "0 4px 12px rgba(22,163,74,0.3)" : "none" }}>
              {m === "login" ? "Masuk" : "Daftar"}
            </button>
          ))}
        </div>

        {/* Fields with animated border */}
        <div className="flex flex-col gap-3 mb-4">
          <div style={{ position:"relative" }}>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              placeholder="📧  Email kamu"
              className="w-full rounded-2xl px-4 py-4 outline-none transition-all"
              style={{ fontSize:"0.9rem", border: focusedField==="email" ? "2px solid #22c55e" : "2px solid #f3f4f6",
                background: "#f9fafb", minHeight:52 }}/>
          </div>
          <div style={{ position:"relative" }}>
            <input type={showPass ? "text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
              onFocus={() => setFocusedField("pass")}
              onBlur={() => setFocusedField(null)}
              placeholder="🔒  Password"
              className="w-full rounded-2xl px-4 py-4 outline-none transition-all pr-14"
              style={{ fontSize:"0.9rem", border: focusedField==="pass" ? "2px solid #22c55e" : "2px solid #f3f4f6",
                background:"#f9fafb", minHeight:52 }}/>
            {/* Big visible toggle */}
            <button type="button" onClick={() => setShowPass(v=>!v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-gray-100"
              style={{ fontSize:"0.72rem", fontWeight:600, color:"#6b7280" }}>
              {showPass ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {mode === "login" && (
          <div className="text-right mb-3">
            <a href="#" style={{ fontSize:"0.8rem", color:"#16a34a", fontWeight:600 }}>Lupa password?</a>
          </div>
        )}

        {/* Big CTA */}
        <button className="w-full rounded-2xl text-white font-bold mb-4 flex items-center justify-center gap-2"
          style={{ minHeight:56, fontSize:"1rem",
            background:"linear-gradient(135deg,#22c55e,#16a34a)",
            boxShadow:"0 6px 20px rgba(34,197,94,0.4)" }}>
          {mode === "login" ? "🚀 Masuk Sekarang" : "✨ Buat Akun Gratis"}
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-px bg-gray-100"/>
          <span style={{ fontSize:"0.75rem", color:"#9ca3af" }}>atau</span>
          <div className="flex-1 h-px bg-gray-100"/>
        </div>

        {/* Big Google button */}
        <button className="w-full flex items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white"
          style={{ minHeight:52, fontSize:"0.9rem", color:"#374151", fontWeight:600 }}>
          <GoogleIcon/> Lanjutkan dengan Google
        </button>
      </div>

      <p className="text-center pb-8" style={{ fontSize:"0.82rem", color:"#6b7280" }}>
        {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
        <button onClick={() => setMode(mode==="login"?"register":"login")}
          style={{ color:"#16a34a", fontWeight:700 }}>
          {mode === "login" ? "Daftar Gratis" : "Masuk"}
        </button>
      </p>
    </div>
  );
}

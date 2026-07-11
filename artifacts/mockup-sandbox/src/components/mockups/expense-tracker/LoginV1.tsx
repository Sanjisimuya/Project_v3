/**
 * V1 — Clarity / Information Hierarchy
 * Tradeoff: Every piece of information has a clear visual rank.
 * App brand + tagline dominate the top. Form fields have explicit labels
 * (not just placeholders). Sections are visually separated. The user
 * always knows WHERE they are and WHAT they're filling in.
 */
import { useState } from "react";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.2-.1-2.5-.4-3.5z" fill="#FFC107"/>
      <path d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 7.1 29.5 4.5 24 4.5 16.3 4.5 9.7 8.7 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.4C9.8 35.8 16.3 40 24 40v4z" fill="#4CAF50"/>
      <path d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C37.1 38.7 44 33 44 24c0-1.2-.1-2.5-.4-3.5z" fill="#1976D2"/>
    </svg>
  );
}

export function LoginV1() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col h-full w-full bg-white" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* ── Brand hero — highest hierarchy ── */}
      <div className="flex flex-col items-center pt-14 pb-8 px-6"
        style={{ background: "linear-gradient(160deg,#fce7f3 0%,#f0fdf4 100%)" }}>
        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md mb-4 bg-white">
          <video autoPlay loop muted playsInline style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}>
            <source src="/__mockup/mascot.webm" type="video/webm"/>
            <source src="/__mockup/mascot_web.mp4" type="video/mp4"/>
          </video>
        </div>
        <h1 style={{ fontSize:"1.6rem", fontWeight:800, color:"#111827", letterSpacing:"-0.02em" }}>DompetKu</h1>
        <p style={{ fontSize:"0.78rem", color:"#6b7280", marginTop:4 }}>Catat. Analisa. Hemat lebih banyak.</p>
      </div>

      {/* ── Form card — second hierarchy ── */}
      <div className="flex-1 bg-white px-6 pt-6">
        {/* Tab row */}
        <div className="flex rounded-2xl bg-gray-100 p-1 mb-6">
          {(["login","register"] as const).map(m => (
            <button key={m} onClick={() => setMode(m)} className="flex-1 py-2 rounded-xl transition-all"
              style={{ fontSize:"0.85rem", fontWeight: mode===m ? 700 : 500,
                background: mode===m ? "#fff" : "transparent",
                color: mode===m ? "#111827" : "#9ca3af",
                boxShadow: mode===m ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
              {m === "login" ? "Masuk" : "Daftar"}
            </button>
          ))}
        </div>

        {/* Labeled fields */}
        <div className="flex flex-col gap-4 mb-4">
          <div>
            <label style={{ fontSize:"0.72rem", fontWeight:600, color:"#374151", display:"block", marginBottom:6, letterSpacing:"0.04em", textTransform:"uppercase" }}>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="kamu@email.com"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-400 transition-colors bg-gray-50"
              style={{ fontSize:"0.9rem", color:"#111827" }}/>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label style={{ fontSize:"0.72rem", fontWeight:600, color:"#374151", letterSpacing:"0.04em", textTransform:"uppercase" }}>Password</label>
              {mode === "login" && <a href="#" style={{ fontSize:"0.72rem", color:"#16a34a", fontWeight:500 }}>Lupa?</a>}
            </div>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
              placeholder="Min 8 karakter"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-400 transition-colors bg-gray-50"
              style={{ fontSize:"0.9rem" }}/>
          </div>
        </div>

        <button className="w-full py-3.5 rounded-xl text-white font-bold mb-5"
          style={{ background:"linear-gradient(135deg,#22c55e,#16a34a)", fontSize:"0.95rem",
            boxShadow:"0 4px 14px rgba(34,197,94,0.35)" }}>
          {mode === "login" ? "Masuk ke Akun" : "Buat Akun Baru"}
        </button>

        {/* Divider with clear label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200"/>
          <span style={{ fontSize:"0.72rem", color:"#9ca3af", fontWeight:500 }}>ATAU LANJUTKAN DENGAN</span>
          <div className="flex-1 h-px bg-gray-200"/>
        </div>

        <button className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border border-gray-200 bg-white"
          style={{ fontSize:"0.875rem", color:"#374151", fontWeight:500 }}>
          <GoogleIcon/> Google
        </button>

        <p className="text-center mt-5" style={{ fontSize:"0.8rem", color:"#6b7280" }}>
          {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
          <button onClick={() => setMode(mode==="login"?"register":"login")}
            style={{ color:"#16a34a", fontWeight:600 }}>
            {mode === "login" ? "Daftar" : "Masuk"}
          </button>
        </p>
      </div>
    </div>
  );
}

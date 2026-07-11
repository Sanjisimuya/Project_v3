import { useState } from "react";
import { Bell, Shield, Smartphone, ChevronRight, Moon, Download, Trash2, User, CheckCircle } from "lucide-react";
import { Reminder, formatRupiah } from "./data";

interface Props {
  reminders: Reminder[];
  onToggleReminder: (id: string) => void;
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="text-gray-400 px-5 mb-2 mt-5" style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {title}
    </p>
  );
}

function SettingRow({ icon, label, value, onClick, danger }: {
  icon: React.ReactNode; label: string; value?: string; onClick?: () => void; danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 active:bg-gray-100 transition-colors"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${danger ? "bg-red-50" : "bg-gray-100"}`}>
        <span className={danger ? "text-red-500" : "text-gray-600"}>{icon}</span>
      </div>
      <div className="flex-1 text-left">
        <p className={`${danger ? "text-red-500" : "text-gray-800"}`} style={{ fontSize: "0.875rem" }}>{label}</p>
        {value && <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>{value}</p>}
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </button>
  );
}

export function Settings({ reminders, onToggleReminder }: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-5 bg-white border-b border-gray-100">
        <h1 className="text-gray-900" style={{ fontWeight: 700 }}>Pengaturan</h1>
      </div>

      {/* Profile */}
      <div className="mx-5 mt-4 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 p-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <span className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>A</span>
          </div>
          <div className="flex-1">
            <p className="text-gray-900" style={{ fontWeight: 600 }}>Ahmad Rizki</p>
            <p className="text-gray-400" style={{ fontSize: "0.8rem" }}>ahmad.rizki@email.com</p>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <p className="text-green-600" style={{ fontSize: "0.7rem" }}>Aktif sejak 15 Jan 2024</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </div>
      </div>

      {/* Reminders */}
      <SectionHeader title="Pengingat Tagihan" />
      <div className="mx-5 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {reminders.map((r, i) => (
          <div key={r.id}>
            {i > 0 && <div className="mx-4 h-px bg-gray-50" />}
            <button
              onClick={() => onToggleReminder(r.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${r.isPaid ? "bg-green-50" : "bg-orange-50"}`}>
                {r.isPaid
                  ? <CheckCircle size={18} className="text-green-500" />
                  : <Bell size={18} className="text-orange-500" />
                }
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-800" style={{ fontSize: "0.875rem" }}>{r.title}</p>
                <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>
                  Jatuh tempo: {new Date(r.dueDate).toLocaleDateString("id-ID", { day: "numeric", month: "long" })} · {formatRupiah(r.amount)}
                </p>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-white shrink-0`}
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  backgroundColor: r.isPaid ? "#22c55e" : "#f97316",
                }}
              >
                {r.isPaid ? "Lunas" : "Belum Bayar"}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* App Settings */}
      <SectionHeader title="Preferensi Aplikasi" />
      <div className="mx-5 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 shrink-0">
            <Moon size={18} className="text-gray-600" />
          </div>
          <p className="flex-1 text-gray-800" style={{ fontSize: "0.875rem" }}>Mode Gelap</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? "bg-green-500" : "bg-gray-200"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
        {/* Notifications Toggle */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gray-100 shrink-0">
            <Bell size={18} className="text-gray-600" />
          </div>
          <div className="flex-1">
            <p className="text-gray-800" style={{ fontSize: "0.875rem" }}>Notifikasi</p>
            <p className="text-gray-400" style={{ fontSize: "0.72rem" }}>Pengingat & pembaruan</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-11 h-6 rounded-full transition-colors relative ${notifications ? "bg-green-500" : "bg-gray-200"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${notifications ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
        </div>
      </div>

      {/* Account */}
      <SectionHeader title="Akun" />
      <div className="mx-5 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <SettingRow icon={<User size={18} />} label="Edit Profil" value="Ubah nama & foto" />
        <div className="mx-4 h-px bg-gray-50" />
        <SettingRow icon={<Shield size={18} />} label="Keamanan" value="Kata sandi & PIN" />
        <div className="mx-4 h-px bg-gray-50" />
        <SettingRow icon={<Smartphone size={18} />} label="Sinkronisasi Data" value="Semua perangkat tersinkron" />
        <div className="mx-4 h-px bg-gray-50" />
        <SettingRow icon={<Download size={18} />} label="Ekspor Data" value="Export ke CSV / PDF" />
      </div>

      <SectionHeader title="Bahaya" />
      <div className="mx-5 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4">
        <SettingRow icon={<Trash2 size={18} />} label="Hapus Semua Data" danger />
      </div>
    </div>
  );
}

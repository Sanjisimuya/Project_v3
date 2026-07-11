import { useState } from "react";
import { Home, List, PieChart, Search, X, ChevronDown, ChevronRight, Bell, Smartphone, User, CheckCircle } from "lucide-react";
import { LoginPage } from "./LoginPage";
import {
  PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { DogAnimation } from "./DogAnimation";
import {
  Transaction, Reminder, Category,
  initialTransactions, initialReminders,
  formatRupiah, formatDate, formatTime,
  getMonthlyData, getCurrentMonthTotal,
  getTodayTransactions, getYesterdayTransactions,
  getCategoryBreakdown,
  CATEGORY_COLORS, CATEGORY_ICONS,
} from "./data";

type Tab = "dashboard" | "history" | "reports" | "settings";

// ─── Dashboard ───────────────────────────────────────────────────────────────

function TransactionItem({ tx }: { tx: Transaction }) {
  return (
    <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: CATEGORY_COLORS[tx.category] + "20" }}
      >
        <span style={{ fontSize: "1.1rem" }}>{CATEGORY_ICONS[tx.category]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-800 truncate" style={{ fontSize: "0.875rem", fontWeight: 500 }}>{tx.title}</p>
        <p className="text-gray-400" style={{ fontSize: "0.7rem" }}>{tx.category} · {formatTime(tx.date)}</p>
      </div>
      <p style={{ color: "#dc2626", fontWeight: 700, fontSize: "0.875rem", whiteSpace: "nowrap" }}>
        -{formatRupiah(tx.amount)}
      </p>
    </div>
  );
}

function Dashboard({ transactions, onAddExpense }: { transactions: Transaction[]; onAddExpense: () => void }) {
  const [showToday, setShowToday] = useState(true);
  const currentMonth = getCurrentMonthTotal(transactions);
  const todayTx = getTodayTransactions(transactions);
  const yesterdayTx = getYesterdayTransactions(transactions);
  const todayTotal = todayTx.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      <DogAnimation />
      <div className="px-5 -mt-1 grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-1" style={{ fontSize: "0.7rem" }}>Pengeluaran Hari Ini</p>
          <p className="text-gray-900" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{formatRupiah(todayTotal)}</p>
          <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.7rem" }}>{todayTx.length} transaksi</p>
        </div>
        <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
          <p className="text-gray-500 mb-1" style={{ fontSize: "0.7rem" }}>Rata-rata Harian</p>
          <p className="text-gray-900" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            {formatRupiah(Math.round(currentMonth / 11))}
          </p>
          <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.7rem" }}>bulan ini</p>
        </div>
      </div>

      <div className="mx-5 mb-4">
        <button
          onClick={() => setShowToday((v) => !v)}
          className="flex items-center justify-between w-full mb-3"
        >
          <h3 className="text-gray-900">Hari Ini</h3>
          <div className="flex items-center gap-2">
            {todayTx.length > 0 && (
              <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>{formatRupiah(todayTotal)}</span>
            )}
            <ChevronDown
              size={16}
              className="text-gray-400 transition-transform"
              style={{ transform: showToday ? "rotate(0deg)" : "rotate(-90deg)" }}
            />
          </div>
        </button>
        {showToday && (
          todayTx.length === 0 ? (
            <div className="bg-white rounded-2xl p-6 text-center border border-gray-100">
              <p style={{ fontSize: "2rem" }}>📋</p>
              <p className="text-gray-400 mt-1" style={{ fontSize: "0.8rem" }}>Belum ada transaksi hari ini</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todayTx.map((tx) => <TransactionItem key={tx.id} tx={tx} />)}
            </div>
          )
        )}
      </div>

      {yesterdayTx.length > 0 && (
        <div className="mx-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900">Kemarin</h3>
            <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>
              {formatRupiah(yesterdayTx.reduce((s, t) => s + t.amount, 0))}
            </span>
          </div>
          <div className="space-y-2">
            {yesterdayTx.map((tx) => <TransactionItem key={tx.id} tx={tx} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── History ──────────────────────────────────────────────────────────────────

const ALL_CATS: (Category | "Semua")[] = ["Semua", "Makanan", "Transportasi", "Belanja", "Hiburan", "Kesehatan", "Tagihan", "Lainnya"];

function History({ transactions }: { transactions: Transaction[] }) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<Category | "Semua">("Semua");

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "Semua" || tx.category === selectedCat;
    return matchSearch && matchCat;
  });

  const grouped: Record<string, Transaction[]> = {};
  filtered.forEach((tx) => {
    const key = formatDate(tx.date);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(tx);
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      <div className="px-5 pt-10 pb-4 bg-white border-b border-gray-100">
        <h1 className="text-gray-900 mb-4" style={{ fontWeight: 700 }}>Riwayat Transaksi</h1>
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari transaksi..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            style={{ fontSize: "0.875rem" }}
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>


      <div className="px-5 py-2">
        <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>{filtered.length} transaksi ditemukan</p>
      </div>

      <div className="px-5 space-y-4 pb-4">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16">
            <p style={{ fontSize: "3rem" }}>🔍</p>
            <p className="text-gray-400 mt-2">Tidak ada transaksi ditemukan</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, txs]) => (
            <div key={date}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500" style={{ fontSize: "0.75rem", fontWeight: 600 }}>{date}</p>
                <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>
                  -{formatRupiah(txs.reduce((s, t) => s + t.amount, 0))}
                </p>
              </div>
              <div className="space-y-2">
                {txs.map((tx) => (
                  <div key={tx.id} className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[tx.category] + "20" }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>{CATEGORY_ICONS[tx.category]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 truncate" style={{ fontSize: "0.875rem", fontWeight: 500 }}>{tx.title}</p>
                      <p className="text-gray-400" style={{ fontSize: "0.7rem" }}>{tx.category} · {formatTime(tx.date)}</p>
                      {tx.note && <p className="text-gray-400 italic" style={{ fontSize: "0.68rem" }}>{tx.note}</p>}
                    </div>
                    <p style={{ color: "#dc2626", fontWeight: 700, fontSize: "0.875rem", whiteSpace: "nowrap" }}>
                      -{formatRupiah(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Reports ──────────────────────────────────────────────────────────────────

function CustomLegend({ payload }: any) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      {payload.map((entry: any) => (
        <div key={entry.value} className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-600" style={{ fontSize: "0.7rem" }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function Reports({ transactions }: { transactions: Transaction[] }) {
  const monthlyData = getMonthlyData(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const currentMonthTotal = getCurrentMonthTotal(transactions);
  const COLORS = categoryBreakdown.map((item) => CATEGORY_COLORS[item.name as Category] || "#6b7280");
  const topCategory = categoryBreakdown[0];

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      <div className="px-5 pt-10 pb-5 bg-white border-b border-gray-100">
        <h1 className="text-gray-900" style={{ fontWeight: 700 }}>Laporan Keuangan</h1>
        <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.8rem" }}>Juli 2026</p>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-1" style={{ fontSize: "0.7rem" }}>Total Bulan Ini</p>
            <p className="text-gray-900" style={{ fontSize: "1rem", fontWeight: 700 }}>{formatRupiah(currentMonthTotal)}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-1" style={{ fontSize: "0.7rem" }}>Kategori Terbanyak</p>
            <p className="text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 700 }}>
              {topCategory ? `${CATEGORY_ICONS[topCategory.name as Category]} ${topCategory.name}` : "-"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-1">Distribusi Kategori</h3>
          <p className="text-gray-400 mb-3" style={{ fontSize: "0.75rem" }}>Pengeluaran bulan ini per kategori</p>
          <ResponsiveContainer width="100%" height={220}>
            <RechartsPieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryBreakdown.map((item, index) => (
                  <Cell key={`cell-${item.name}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => formatRupiah(value)} />
              <Legend content={<CustomLegend />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-3">Detail per Kategori</h3>
          <div className="space-y-3">
            {categoryBreakdown.map((item) => {
              const pct = currentMonthTotal > 0 ? (item.value / currentMonthTotal) * 100 : 0;
              const color = CATEGORY_COLORS[item.name as Category] || "#6b7280";
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: "0.9rem" }}>{CATEGORY_ICONS[item.name as Category]}</span>
                      <span className="text-gray-700" style={{ fontSize: "0.8rem" }}>{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-800" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{formatRupiah(item.value)}</span>
                      <span className="text-gray-400 ml-1" style={{ fontSize: "0.7rem" }}>{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-1">Tren 6 Bulan</h3>
          <p className="text-gray-400 mb-3" style={{ fontSize: "0.75rem" }}>Perbandingan pengeluaran bulanan</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={monthlyData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v: number) => formatRupiah(v)} />
              <Bar dataKey="total" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ─── Me ───────────────────────────────────────────────────────────────────────

function MeSectionHeader({ title }: { title: string }) {
  return (
    <p className="text-gray-400 px-5 mb-2 mt-5" style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
      {title}
    </p>
  );
}

function SettingsView({ reminders: _reminders, onToggleReminder: _onToggleReminder, userName = "", userEmail = "", onLogout }: { reminders: Reminder[]; onToggleReminder: (id: string) => void; userName?: string; userEmail?: string; onLogout?: () => void }) {
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [editMode, setEditMode] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [rated, setRated] = useState(false);

  const initial = name.trim() ? name.trim()[0].toUpperCase() : "?";

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      {/* Header */}
      <div className="px-5 pt-10 pb-5 bg-white border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-gray-900" style={{ fontWeight: 700 }}>Me</h1>
        <button
          onClick={() => setEditMode((v) => !v)}
          className="px-3 py-1 rounded-full border border-green-400 text-green-600 transition-colors hover:bg-green-50"
          style={{ fontSize: "0.75rem", fontWeight: 600 }}
        >
          {editMode ? "Simpan" : "Edit"}
        </button>
      </div>

      {/* Profile card */}
      <div className="mx-5 mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shrink-0">
            <span className="text-white" style={{ fontSize: "1.75rem", fontWeight: 700 }}>{initial}</span>
          </div>
          <div className="flex-1 min-w-0">
            {editMode ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                className="w-full bg-gray-100 rounded-xl px-3 py-1.5 outline-none text-gray-800 mb-1.5"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              />
            ) : (
              <p className="text-gray-900 truncate" style={{ fontWeight: 700 }}>
                {name || <span className="text-gray-300">Belum diisi</span>}
              </p>
            )}
            {editMode ? (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email kamu"
                className="w-full bg-gray-100 rounded-xl px-3 py-1.5 outline-none text-gray-500"
                style={{ fontSize: "0.8rem" }}
              />
            ) : (
              <p className="text-gray-400 truncate" style={{ fontSize: "0.8rem" }}>
                {email || <span className="text-gray-300">Belum diisi</span>}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Rating */}
      <MeSectionHeader title="Rating Aplikasi" />
      <div className="mx-5 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <p className="text-gray-700 mb-1" style={{ fontWeight: 600 }}>Beri Rating Aplikasi</p>
        <p className="text-gray-400 mb-4" style={{ fontSize: "0.78rem" }}>Bagaimana pengalaman kamu?</p>
        <div className="flex gap-2 justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => !rated && setHoverRating(star)}
              onMouseLeave={() => !rated && setHoverRating(0)}
              onClick={() => { setRating(star); setRated(true); }}
              style={{ fontSize: "2rem", transition: "transform 0.15s", transform: (hoverRating || rating) >= star ? "scale(1.2)" : "scale(1)" }}
            >
              <span style={{ color: (hoverRating || rating) >= star ? "#f59e0b" : "#e5e7eb" }}>★</span>
            </button>
          ))}
        </div>
        {rated && (
          <p className="text-center text-green-600" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            Terima kasih atas rating {rating} bintang! 🎉
          </p>
        )}
        {!rated && (
          <p className="text-center text-gray-300" style={{ fontSize: "0.78rem" }}>Ketuk bintang untuk memberi rating</p>
        )}
      </div>

      {/* Contact */}
      <MeSectionHeader title="Hubungi Pembuat" />
      <div className="mx-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-green-50 shrink-0">
            <Smartphone size={18} className="text-green-500" />
          </div>
          <div className="flex-1">
            <p className="text-gray-800" style={{ fontSize: "0.875rem", fontWeight: 500 }}>WhatsApp / Telepon</p>
            <p className="text-green-600" style={{ fontSize: "0.8rem", fontWeight: 600 }}>085185033441</p>
          </div>
        </div>
      </div>

      {/* Logout */}
      {onLogout && (
        <>
          <MeSectionHeader title="Akun" />
          <div className="mx-5 mb-6">
            <button
              onClick={onLogout}
              className="w-full py-3.5 rounded-2xl border-2 border-red-200 text-red-500 font-semibold transition-colors hover:bg-red-50 active:bg-red-100"
              style={{ fontSize: "0.9rem" }}
            >
              Keluar dari Akun
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Add Expense Modal ────────────────────────────────────────────────────────

const CATEGORIES: Category[] = ["Makanan", "Transportasi", "Belanja", "Hiburan", "Kesehatan", "Tagihan", "Lainnya"];

function AddExpenseModal({ onClose, onAdd }: { onClose: () => void; onAdd: (title: string, category: Category, amount: number, note: string) => void }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("Makanan");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const handleAmountChange = (val: string) => {
    const clean = val.replace(/\D/g, "");
    setAmount(clean);
  };

  const handleSubmit = () => {
    if (!title.trim() || !amount || Number(amount) <= 0) return;
    onAdd(title.trim(), category, Number(amount), note.trim());
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="w-full bg-white rounded-t-3xl pb-8">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="text-gray-900">Tambah Pengeluaran</h2>
          <button onClick={onClose} className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 space-y-4">
          <div className="bg-green-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Jumlah</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-green-600" style={{ fontSize: "1.25rem" }}>Rp</span>
              <input
                type="tel"
                value={amount ? Number(amount).toLocaleString("id-ID") : ""}
                onChange={(e) => handleAmountChange(e.target.value.replace(/\./g, ""))}
                placeholder="0"
                className="bg-transparent text-green-700 text-center w-48 outline-none placeholder-green-300"
                style={{ fontSize: "1.875rem", fontWeight: 700 }}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Keterangan</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nama pengeluaran..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-green-400 bg-gray-50 text-gray-800"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Kategori</label>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-3.5 py-2.5 bg-gray-50 text-gray-800"
            >
              <span>{CATEGORY_ICONS[category]} {category}</span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${showCategories ? "rotate-180" : ""}`} />
            </button>
            {showCategories && (
              <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setShowCategories(false); }}
                    className={`w-full flex items-center gap-2 px-3.5 py-2.5 hover:bg-gray-50 text-left text-gray-800 ${cat === category ? "bg-green-50 text-green-700" : ""}`}
                  >
                    <span>{CATEGORY_ICONS[cat]}</span>
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Catatan (opsional)</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tambah catatan..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-green-400 bg-gray-50 text-gray-800"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !amount || Number(amount) <= 0}
            className="w-full py-3.5 rounded-2xl text-white disabled:opacity-40 transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
          >
            Simpan Pengeluaran
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Bottom Nav ───────────────────────────────────────────────────────────────

function BottomNav({ activeTab, onTabChange, onAddExpense }: { activeTab: Tab; onTabChange: (tab: Tab) => void; onAddExpense: () => void }) {
  const tabs = [
    { id: "dashboard" as Tab, icon: Home, label: "Beranda" },
    { id: "history" as Tab, icon: List, label: "Riwayat" },
    { id: "reports" as Tab, icon: PieChart, label: "Laporan" },
    { id: "settings" as Tab, icon: User, label: "Me" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 40 }}>
      <div className="relative flex justify-center" style={{ marginBottom: "-1px" }}>
        <button
          onClick={onAddExpense}
          className="absolute -top-7 w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center transition-transform active:scale-90"
          style={{
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            boxShadow: "0 4px 20px rgba(34,197,94,0.5)",
          }}
        >
          <span style={{ fontSize: "1.75rem", lineHeight: 1, fontWeight: 300 }}>+</span>
        </button>
      </div>
      <div className="bg-white border-t border-gray-100 flex items-stretch">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isMid = idx === 1 || idx === 2;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${isMid && idx === 2 ? "ml-8" : ""} ${isMid && idx === 1 ? "mr-8" : ""}`}
            >
              <Icon
                size={22}
                className={isActive ? "text-green-500" : "text-gray-400"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span style={{ fontSize: "0.62rem", fontWeight: isActive ? 600 : 400, color: isActive ? "#22c55e" : "#9ca3af" }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInName, setLoggedInName] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const handleLogin = (name: string, email: string) => {
    setLoggedInName(name);
    setLoggedInEmail(email);
    setIsLoggedIn(true);
  };

  const handleAddExpense = (title: string, category: Category, amount: number, note: string) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title,
      category,
      amount,
      date: new Date().toISOString(),
      note: note || undefined,
    };
    setTransactions([newTx, ...transactions]);
  };

  const handleToggleReminder = (id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, isPaid: !r.isPaid } : r)));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div
        className="relative overflow-hidden bg-gray-50"
        style={{
          width: "100%",
          maxWidth: "390px",
          height: "844px",
          borderRadius: "44px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
        }}
      >
        {/* ── Login gate ── */}
        {!isLoggedIn ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <>
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden relative">
                <div className={`absolute inset-0 ${activeTab === "dashboard" ? "block" : "hidden"}`}>
                  <Dashboard transactions={transactions} onAddExpense={() => setShowAddModal(true)} />
                </div>
                <div className={`absolute inset-0 ${activeTab === "history" ? "block" : "hidden"}`}>
                  <History transactions={transactions} />
                </div>
                <div className={`absolute inset-0 ${activeTab === "reports" ? "block" : "hidden"}`}>
                  <Reports transactions={transactions} />
                </div>
                <div className={`absolute inset-0 ${activeTab === "settings" ? "block" : "hidden"}`}>
                  <SettingsView
                    reminders={reminders}
                    onToggleReminder={handleToggleReminder}
                    userName={loggedInName}
                    userEmail={loggedInEmail}
                    onLogout={() => setIsLoggedIn(false)}
                  />
                </div>
              </div>
            </div>

            <BottomNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onAddExpense={() => setShowAddModal(true)}
            />

            {showAddModal && (
              <AddExpenseModal
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddExpense}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

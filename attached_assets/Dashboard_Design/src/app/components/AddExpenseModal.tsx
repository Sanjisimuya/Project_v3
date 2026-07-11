import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Category, CATEGORY_ICONS, formatRupiah } from "./data";

const CATEGORIES: Category[] = ["Makanan", "Transportasi", "Belanja", "Hiburan", "Kesehatan", "Tagihan", "Lainnya"];

interface Props {
  onClose: () => void;
  onAdd: (title: string, category: Category, amount: number, note: string) => void;
}

export function AddExpenseModal({ onClose, onAdd }: Props) {
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
    <div className="fixed inset-0 z-50 flex items-end justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="w-full max-w-sm bg-white rounded-t-3xl pb-8 animate-in slide-in-from-bottom">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <h2 className="text-gray-900">Tambah Pengeluaran</h2>
          <button onClick={onClose} className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
            <X size={18} />
          </button>
        </div>

        <div className="px-5 space-y-4">
          {/* Amount input prominent */}
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

          {/* Title */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Keterangan</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nama pengeluaran..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-green-400 bg-gray-50 text-gray-800"
            />
          </div>

          {/* Category */}
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

          {/* Note */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Catatan (opsional)</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tambah catatan..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-green-400 bg-gray-50 text-gray-800"
            />
          </div>

          {/* Submit */}
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

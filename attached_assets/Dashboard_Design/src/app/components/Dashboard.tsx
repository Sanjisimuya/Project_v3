import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DogAnimation } from "./DogAnimation";
import {
  Transaction,
  formatRupiah,
  getMonthlyData,
  getCurrentMonthTotal,
  getTodayTransactions,
  getYesterdayTransactions,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  formatTime,
} from "./data";

interface Props {
  transactions: Transaction[];
  onAddExpense: () => void;
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-green-600" style={{ fontWeight: 700, fontSize: "0.875rem" }}>{formatRupiah(payload[0].value)}</p>
      </div>
    );
  }
  return null;
}

export function Dashboard({ transactions, onAddExpense }: Props) {
  const [showToday, setShowToday] = useState(true);
  const monthlyData = getMonthlyData(transactions);
  const currentMonth = getCurrentMonthTotal(transactions);
  const todayTx = getTodayTransactions(transactions);
  const yesterdayTx = getYesterdayTransactions(transactions);
  const todayTotal = todayTx.reduce((s, t) => s + t.amount, 0);

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      {/* Header - Dog Animation */}
      <DogAnimation />

      {/* Quick Stats */}
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


      {/* Today's Transactions */}
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
              {todayTx.map((tx) => (
                <TransactionItem key={tx.id} tx={tx} />
              ))}
            </div>
          )
        )}
      </div>

      {/* Yesterday's Transactions */}
      {yesterdayTx.length > 0 && (
        <div className="mx-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900">Kemarin</h3>
            <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>
              {formatRupiah(yesterdayTx.reduce((s, t) => s + t.amount, 0))}
            </span>
          </div>
          <div className="space-y-2">
            {yesterdayTx.map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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

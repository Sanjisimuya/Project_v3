import { useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Transaction } from '@workspace/api-client-react';
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  formatDate,
  formatRupiah,
  formatTime,
  type Category,
} from '@/lib/expense';

const ALL_CATS: (Category | 'Semua')[] = [
  'Semua', 'Makanan', 'Transportasi', 'Belanja', 'Hiburan', 'Kesehatan', 'Tagihan', 'Lainnya',
];

interface HistoryProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

export function History({ transactions, onDelete }: HistoryProps) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<Category | 'Semua'>('Semua');

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'Semua' || tx.category === selectedCat;
    return matchSearch && matchCat;
  });

  const grouped: Record<string, Transaction[]> = {};
  filtered.forEach((tx) => {
    const key = formatDate(tx.occurredAt);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(tx);
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      <div className="px-5 pt-10 pb-4 bg-white border-b border-gray-100">
        <h1 className="text-gray-900 mb-4" style={{ fontWeight: 700 }}>
          Riwayat Transaksi
        </h1>
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari transaksi..."
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            style={{ fontSize: '0.875rem' }}
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1">
          {ALL_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className="px-3 py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0"
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                backgroundColor: selectedCat === cat ? '#16a34a' : '#f3f4f6',
                color: selectedCat === cat ? '#fff' : '#6b7280',
              }}
            >
              {cat !== 'Semua' && CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-2">
        <p className="text-gray-400" style={{ fontSize: '0.75rem' }}>
          {filtered.length} transaksi ditemukan
        </p>
      </div>

      <div className="px-5 space-y-4 pb-4">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16">
            <p style={{ fontSize: '3rem' }}>🔍</p>
            <p className="text-gray-400 mt-2">Tidak ada transaksi ditemukan</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, txs]) => (
            <div key={date}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                  {date}
                </p>
                <p className="text-gray-400" style={{ fontSize: '0.75rem' }}>
                  -{formatRupiah(txs.reduce((s, t) => s + t.amount, 0))}
                </p>
              </div>
              <div className="space-y-2">
                {txs.map((tx) => (
                  <div
                    key={tx.id}
                    className="group bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm border border-gray-100"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[tx.category] + '20' }}
                    >
                      <span style={{ fontSize: '1.1rem' }}>{CATEGORY_ICONS[tx.category]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 truncate" style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                        {tx.title}
                      </p>
                      <p className="text-gray-400" style={{ fontSize: '0.7rem' }}>
                        {tx.category} · {formatTime(tx.occurredAt)}
                      </p>
                      {tx.note && (
                        <p className="text-gray-400 italic" style={{ fontSize: '0.68rem' }}>
                          {tx.note}
                        </p>
                      )}
                    </div>
                    <p style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                      -{formatRupiah(tx.amount)}
                    </p>
                    <button
                      onClick={() => onDelete(tx.id)}
                      className="shrink-0 p-1.5 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                      aria-label="Hapus transaksi"
                    >
                      <X size={14} />
                    </button>
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

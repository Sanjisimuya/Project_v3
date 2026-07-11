import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Transaction } from '@workspace/api-client-react';
import {
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  formatRupiah,
  getCategoryBreakdown,
  getCurrentMonthTotal,
  getMonthlyData,
  type Category,
} from '@/lib/expense';

function CustomLegend({ payload }: any) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-2">
      {payload.map((entry: any) => (
        <div key={entry.value} className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          <span className="text-gray-600" style={{ fontSize: '0.7rem' }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

interface ReportsProps {
  transactions: Transaction[];
}

export function Reports({ transactions }: ReportsProps) {
  const monthlyData = getMonthlyData(transactions);
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const currentMonthTotal = getCurrentMonthTotal(transactions);
  const COLORS = categoryBreakdown.map(
    (item) => CATEGORY_COLORS[item.name as Category] || '#6b7280',
  );
  const topCategory = categoryBreakdown[0];
  const monthLabel = new Date().toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      <div className="px-5 pt-10 pb-5 bg-white border-b border-gray-100">
        <h1 className="text-gray-900" style={{ fontWeight: 700 }}>
          Laporan Keuangan
        </h1>
        <p className="text-gray-400 mt-0.5" style={{ fontSize: '0.8rem' }}>
          {monthLabel}
        </p>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-1" style={{ fontSize: '0.7rem' }}>
              Total Bulan Ini
            </p>
            <p className="text-gray-900" style={{ fontSize: '1rem', fontWeight: 700 }}>
              {formatRupiah(currentMonthTotal)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-1" style={{ fontSize: '0.7rem' }}>
              Kategori Terbanyak
            </p>
            <p className="text-gray-900" style={{ fontSize: '0.875rem', fontWeight: 700 }}>
              {topCategory ? `${CATEGORY_ICONS[topCategory.name as Category]} ${topCategory.name}` : '-'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-1">Distribusi Kategori</h3>
          <p className="text-gray-400 mb-3" style={{ fontSize: '0.75rem' }}>
            Pengeluaran bulan ini per kategori
          </p>
          {categoryBreakdown.length === 0 ? (
            <div className="text-center py-10">
              <p style={{ fontSize: '2rem' }}>📊</p>
              <p className="text-gray-400 mt-1" style={{ fontSize: '0.8rem' }}>
                Belum ada data bulan ini
              </p>
            </div>
          ) : (
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
          )}
        </div>

        {categoryBreakdown.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-gray-900 mb-3">Detail per Kategori</h3>
            <div className="space-y-3">
              {categoryBreakdown.map((item) => {
                const pct = currentMonthTotal > 0 ? (item.value / currentMonthTotal) * 100 : 0;
                const color = CATEGORY_COLORS[item.name as Category] || '#6b7280';
                return (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: '0.9rem' }}>{CATEGORY_ICONS[item.name as Category]}</span>
                        <span className="text-gray-700" style={{ fontSize: '0.8rem' }}>
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-800" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                          {formatRupiah(item.value)}
                        </span>
                        <span className="text-gray-400 ml-1" style={{ fontSize: '0.7rem' }}>
                          {pct.toFixed(1)}%
                        </span>
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
        )}

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-gray-900 mb-1">Tren 6 Bulan</h3>
          <p className="text-gray-400 mb-3" style={{ fontSize: '0.75rem' }}>
            Perbandingan pengeluaran bulanan
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={monthlyData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
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

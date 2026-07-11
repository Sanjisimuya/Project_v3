import type { Transaction } from '@workspace/api-client-react';

export type Category = Transaction['category'];

export const CATEGORIES: Category[] = [
  'Makanan',
  'Transportasi',
  'Belanja',
  'Hiburan',
  'Kesehatan',
  'Tagihan',
  'Lainnya',
];

export const CATEGORY_COLORS: Record<Category, string> = {
  Makanan: '#22c55e',
  Transportasi: '#3b82f6',
  Belanja: '#f59e0b',
  Hiburan: '#a855f7',
  Kesehatan: '#ef4444',
  Tagihan: '#f97316',
  Lainnya: '#6b7280',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Makanan: '🍽️',
  Transportasi: '🚗',
  Belanja: '🛍️',
  Hiburan: '🎬',
  Kesehatan: '💊',
  Tagihan: '📄',
  Lainnya: '📦',
};

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export function getMonthlyData(transactions: Transaction[]) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
  ];
  const now = new Date();
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = d.getMonth();
    const year = d.getFullYear();
    const total = transactions
      .filter((t) => {
        const td = new Date(t.occurredAt);
        return td.getMonth() === month && td.getFullYear() === year;
      })
      .reduce((sum, t) => sum + t.amount, 0);
    result.push({ name: months[month], total, month, year });
  }
  return result;
}

export function getCurrentMonthTotal(transactions: Transaction[]): number {
  const now = new Date();
  return transactions
    .filter((t) => {
      const d = new Date(t.occurredAt);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTodayTransactions(transactions: Transaction[]): Transaction[] {
  return transactions.filter((t) => {
    const d = new Date(t.occurredAt);
    return d.toDateString() === new Date().toDateString();
  });
}

export function getYesterdayTransactions(
  transactions: Transaction[],
): Transaction[] {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return transactions.filter((t) => {
    const d = new Date(t.occurredAt);
    return d.toDateString() === yesterday.toDateString();
  });
}

export function getCategoryBreakdown(transactions: Transaction[]) {
  const now = new Date();
  const monthly = transactions.filter((t) => {
    const d = new Date(t.occurredAt);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const map: Record<string, number> = {};
  monthly.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

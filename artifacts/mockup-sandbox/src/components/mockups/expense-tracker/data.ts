export type Category =
  | "Makanan"
  | "Transportasi"
  | "Belanja"
  | "Hiburan"
  | "Kesehatan"
  | "Tagihan"
  | "Lainnya";

export interface Transaction {
  id: string;
  title: string;
  category: Category;
  amount: number;
  date: string;
  note?: string;
}

export interface Reminder {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  Makanan: "#22c55e",
  Transportasi: "#3b82f6",
  Belanja: "#f59e0b",
  Hiburan: "#a855f7",
  Kesehatan: "#ef4444",
  Tagihan: "#f97316",
  Lainnya: "#6b7280",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  Makanan: "🍽️",
  Transportasi: "🚗",
  Belanja: "🛍️",
  Hiburan: "🎬",
  Kesehatan: "💊",
  Tagihan: "📄",
  Lainnya: "📦",
};

export const initialTransactions: Transaction[] = [
  { id: "1", title: "Makan Siang", category: "Makanan", amount: 35000, date: "2026-07-11T12:00:00Z" },
  { id: "2", title: "Grab ke Kantor", category: "Transportasi", amount: 22000, date: "2026-07-11T08:30:00Z" },
  { id: "3", title: "Kopi Pagi", category: "Makanan", amount: 28000, date: "2026-07-10T07:45:00Z" },
  { id: "4", title: "Beli Buku", category: "Belanja", amount: 85000, date: "2026-07-10T14:00:00Z" },
  { id: "5", title: "Netflix", category: "Hiburan", amount: 54000, date: "2026-07-09T18:00:00Z" },
  { id: "6", title: "Apotik", category: "Kesehatan", amount: 45000, date: "2026-07-09T10:00:00Z" },
  { id: "7", title: "Listrik PLN", category: "Tagihan", amount: 320000, date: "2026-07-08T09:00:00Z" },
  { id: "8", title: "Makan Malam", category: "Makanan", amount: 65000, date: "2026-07-08T19:30:00Z" },
  { id: "9", title: "Indomaret", category: "Belanja", amount: 112000, date: "2026-07-07T16:00:00Z" },
  { id: "10", title: "Bus Trans", category: "Transportasi", amount: 5000, date: "2026-07-07T07:00:00Z" },
  { id: "11", title: "Makan Siang", category: "Makanan", amount: 42000, date: "2026-07-06T12:30:00Z" },
  { id: "12", title: "Internet", category: "Tagihan", amount: 200000, date: "2026-07-05T09:00:00Z" },
  { id: "13", title: "Bioskop", category: "Hiburan", amount: 95000, date: "2026-07-04T20:00:00Z" },
  { id: "14", title: "Dokter Gigi", category: "Kesehatan", amount: 250000, date: "2026-07-03T11:00:00Z" },
  { id: "15", title: "Warung Makan", category: "Makanan", amount: 28000, date: "2026-07-02T13:00:00Z" },
  { id: "16", title: "Bensin", category: "Transportasi", amount: 100000, date: "2026-07-01T07:30:00Z" },
  { id: "17", title: "Baju Baru", category: "Belanja", amount: 299000, date: "2026-06-28T15:00:00Z", note: "Diskon 20%" },
  { id: "18", title: "Makan Keluarga", category: "Makanan", amount: 185000, date: "2026-06-25T19:00:00Z" },
  { id: "19", title: "Air PDAM", category: "Tagihan", amount: 95000, date: "2026-06-20T09:00:00Z" },
  { id: "20", title: "Spotify", category: "Hiburan", amount: 29000, date: "2026-06-15T10:00:00Z" },
  { id: "21", title: "Vitamin C", category: "Kesehatan", amount: 55000, date: "2026-06-10T09:00:00Z" },
  { id: "22", title: "Ojek Online", category: "Transportasi", amount: 18000, date: "2026-06-08T08:00:00Z" },
  { id: "23", title: "Makan Siang", category: "Makanan", amount: 38000, date: "2026-06-05T12:00:00Z" },
  { id: "24", title: "Game Online", category: "Hiburan", amount: 150000, date: "2026-05-30T20:00:00Z" },
  { id: "25", title: "Listrik PLN", category: "Tagihan", amount: 310000, date: "2026-05-08T09:00:00Z" },
  { id: "26", title: "Groceries", category: "Belanja", amount: 230000, date: "2026-05-15T16:00:00Z" },
  { id: "27", title: "Periksa Mata", category: "Kesehatan", amount: 180000, date: "2026-04-20T10:00:00Z" },
  { id: "28", title: "Makan Siang", category: "Makanan", amount: 40000, date: "2026-04-10T12:00:00Z" },
  { id: "29", title: "Bus", category: "Transportasi", amount: 8000, date: "2026-03-25T07:30:00Z" },
  { id: "30", title: "Listrik", category: "Tagihan", amount: 295000, date: "2026-03-08T09:00:00Z" },
];

export const initialReminders: Reminder[] = [
  { id: "r1", title: "Listrik PLN", amount: 320000, dueDate: "2026-07-15", isPaid: false },
  { id: "r2", title: "Internet Indihome", amount: 200000, dueDate: "2026-07-20", isPaid: false },
  { id: "r3", title: "BPJS Kesehatan", amount: 150000, dueDate: "2026-07-28", isPaid: true },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getMonthlyData(transactions: Transaction[]) {
  const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
  const now = new Date("2026-07-11");
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = d.getMonth();
    const year = d.getFullYear();
    const total = transactions
      .filter((t) => {
        const td = new Date(t.date);
        return td.getMonth() === month && td.getFullYear() === year;
      })
      .reduce((sum, t) => sum + t.amount, 0);
    result.push({ name: months[month], total, month, year });
  }
  return result;
}

export function getCurrentMonthTotal(transactions: Transaction[]): number {
  const now = new Date("2026-07-11");
  return transactions
    .filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTodayTransactions(transactions: Transaction[]): Transaction[] {
  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.toDateString() === new Date("2026-07-11").toDateString();
  });
}

export function getYesterdayTransactions(transactions: Transaction[]): Transaction[] {
  const yesterday = new Date("2026-07-10");
  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.toDateString() === yesterday.toDateString();
  });
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

export function getCategoryBreakdown(transactions: Transaction[]) {
  const now = new Date("2026-07-11");
  const monthly = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const map: Record<string, number> = {};
  monthly.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

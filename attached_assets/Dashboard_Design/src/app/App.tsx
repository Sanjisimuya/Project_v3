import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { History } from "./components/History";
import { Reports } from "./components/Reports";
import { Settings } from "./components/Settings";
import { BottomNav } from "./components/BottomNav";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { Transaction, Reminder, Category, initialTransactions, initialReminders } from "./components/data";

type Tab = "dashboard" | "history" | "reports" | "settings";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const handleAddExpense = (title: string, category: Category, amount: number, note: string) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title,
      category,
      amount,
      date: new Date("2026-07-11T" + new Date().toTimeString().slice(0, 8) + "Z").toISOString(),
      note: note || undefined,
    };
    setTransactions([newTx, ...transactions]);
  };

  const handleToggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isPaid: !r.isPaid } : r))
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Mobile shell */}
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
        {/* Content */}
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
              <Settings reminders={reminders} onToggleReminder={handleToggleReminder} />
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddExpense={() => setShowAddModal(true)}
        />

        {/* Add Expense Modal */}
        {showAddModal && (
          <AddExpenseModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddExpense}
          />
        )}
      </div>
    </div>
  );
}

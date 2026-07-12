import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  useGetCurrentUser,
  useListTransactions,
  useCreateTransaction,
  useDeleteTransaction,
  useLogout,
  getGetCurrentUserQueryKey,
  getListTransactionsQueryKey,
  type Category,
} from '@workspace/api-client-react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { LoginPage } from '@/components/LoginPage';
import { Dashboard } from '@/components/Dashboard';
import { History } from '@/components/History';
import { Reports } from '@/components/Reports';
import { SettingsView } from '@/components/SettingsView';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import { BottomNav, type Tab } from '@/components/BottomNav';
import { clearToken } from '@/lib/auth-token';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div
        className="relative overflow-hidden bg-gray-50"
        style={{
          width: '100%',
          maxWidth: '390px',
          height: '844px',
          borderRadius: '44px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DompetKuApp() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const qc = useQueryClient();
  const { toast } = useToast();

  const currentUser = useGetCurrentUser();
  const transactionsQuery = useListTransactions({
    query: {
      queryKey: getListTransactionsQueryKey(),
      enabled: currentUser.isSuccess,
    },
  });
  const createTransaction = useCreateTransaction();
  const deleteTransaction = useDeleteTransaction();
  const logoutMutation = useLogout();

  if (currentUser.isLoading) {
    return (
      <PhoneShell>
        <div className="flex items-center justify-center h-full text-gray-400" style={{ fontSize: '0.875rem' }}>
          Memuat...
        </div>
      </PhoneShell>
    );
  }

  if (!currentUser.data) {
    return (
      <PhoneShell>
        <LoginPage />
      </PhoneShell>
    );
  }

  const transactions = transactionsQuery.data ?? [];

  const handleAddExpense = (title: string, category: Category, amount: number, note: string) => {
    createTransaction.mutate(
      { data: { title, category, amount, note: note || undefined } },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getListTransactionsQueryKey() });
          setShowAddModal(false);
        },
        onError: () => {
          toast({
            title: 'Gagal menyimpan',
            description: 'Pengeluaran tidak dapat disimpan, coba lagi.',
            variant: 'destructive',
          });
        },
      },
    );
  };

  const handleDeleteExpense = (id: number) => {
    deleteTransaction.mutate(
      { id },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getListTransactionsQueryKey() });
        },
        onError: () => {
          toast({
            title: 'Gagal menghapus',
            description: 'Transaksi tidak dapat dihapus, coba lagi.',
            variant: 'destructive',
          });
        },
      },
    );
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearToken();
        qc.setQueryData(getGetCurrentUserQueryKey(), null);
        qc.clear();
      },
    });
  };

  return (
    <PhoneShell>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          <div className={`absolute inset-0 ${activeTab === 'dashboard' ? 'block' : 'hidden'}`}>
            <Dashboard transactions={transactions} />
          </div>
          <div className={`absolute inset-0 ${activeTab === 'history' ? 'block' : 'hidden'}`}>
            <History transactions={transactions} onDelete={handleDeleteExpense} />
          </div>
          <div className={`absolute inset-0 ${activeTab === 'reports' ? 'block' : 'hidden'}`}>
            <Reports transactions={transactions} />
          </div>
          <div className={`absolute inset-0 ${activeTab === 'settings' ? 'block' : 'hidden'}`}>
            <SettingsView
              userName={currentUser.data.name}
              userEmail={currentUser.data.email}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} onAddExpense={() => setShowAddModal(true)} />

      {showAddModal && (
        <AddExpenseModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddExpense}
          isSubmitting={createTransaction.isPending}
        />
      )}
    </PhoneShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DompetKuApp />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

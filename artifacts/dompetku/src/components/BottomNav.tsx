import { Home, List, PieChart, User } from 'lucide-react';

export type Tab = 'dashboard' | 'history' | 'reports' | 'settings';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onAddExpense: () => void;
}

export function BottomNav({ activeTab, onTabChange, onAddExpense }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard' as Tab, icon: Home, label: 'Beranda' },
    { id: 'history' as Tab, icon: List, label: 'Riwayat' },
    { id: 'reports' as Tab, icon: PieChart, label: 'Laporan' },
    { id: 'settings' as Tab, icon: User, label: 'Me' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 40 }}>
      <div className="relative flex justify-center" style={{ marginBottom: '-1px' }}>
        <button
          onClick={onAddExpense}
          className="absolute -top-7 w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center transition-transform active:scale-90"
          style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            boxShadow: '0 4px 20px rgba(34,197,94,0.5)',
          }}
        >
          <span style={{ fontSize: '1.75rem', lineHeight: 1, fontWeight: 300 }}>+</span>
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
              className={`flex-1 flex flex-col items-center py-3 gap-0.5 transition-colors ${isMid && idx === 2 ? 'ml-8' : ''} ${isMid && idx === 1 ? 'mr-8' : ''}`}
            >
              <Icon
                size={22}
                className={isActive ? 'text-green-500' : 'text-gray-400'}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#22c55e' : '#9ca3af',
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

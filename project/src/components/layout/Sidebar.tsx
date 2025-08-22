import React from 'react';
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  Calendar,
  Shield,
  Package,
  FileText,
  BarChart3,
  Bell,
  User,
  DollarSign
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Ana Sayfa', icon: LayoutDashboard },
  { id: 'projects', label: 'Projeler', icon: FolderOpen },
  { id: 'tasks', label: 'Görevler', icon: CheckSquare },
  { id: 'timeline', label: 'Zaman Planı', icon: Calendar },
  { id: 'quality', label: 'Kalite', icon: Shield },
  { id: 'inventory', label: 'Ekipman', icon: Package },
  { id: 'documents', label: 'Dokümanlar', icon: FileText },
  { id: 'budget', label: 'Bütçe & Finans', icon: DollarSign },
  { id: 'reports', label: 'Raporlar', icon: BarChart3 },
  { id: 'notifications', label: 'Bildirimler', icon: Bell },
  { id: 'profile', label: 'Profil', icon: User }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white dark:bg-gray-900 w-64 min-h-screen border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          AutoPM
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Proje Yönetimi
        </p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
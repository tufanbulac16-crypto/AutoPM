import React from 'react';
import { Moon, Sun, User, BarChart3, FolderOpen, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  dashboardView?: string;
  setDashboardView?: (view: string) => void;
  activeTab: string;
  projectsView?: string;
  setProjectsView?: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  dashboardView, 
  setDashboardView, 
  activeTab,
  projectsView,
  setProjectsView 
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Otomotiv Proje Yönetimi
          </h2>
          {activeTab === 'dashboard' && setDashboardView && (
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => setDashboardView('overview')}
                className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                  dashboardView === 'overview'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Genel Bakış
              </button>
              <button
                onClick={() => setDashboardView('projects')}
                className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                  dashboardView === 'projects'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FolderOpen className="h-4 w-4 mr-1" />
                Proje Özeti
              </button>
            </div>
          )}
          {activeTab === 'projects' && setProjectsView && (
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => setProjectsView('list')}
                className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                  projectsView === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <FolderOpen className="h-4 w-4 mr-1" />
                Proje Listesi
              </button>
              <button
                onClick={() => setProjectsView('changes')}
                className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                  projectsView === 'changes'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                Değişiklik Talepleri
              </button>
            </div>
          )}
          {activeTab === 'notifications' && setDashboardView && (
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => setDashboardView('notifications')}
                className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                  dashboardView === 'notifications'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Bildirimler
              </button>
              <button
                onClick={() => setDashboardView('escalation')}
                className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                  dashboardView === 'escalation'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                Eskalasyon
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={isDark ? 'Açık moda geç' : 'Koyu moda geç'}
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Admin User
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
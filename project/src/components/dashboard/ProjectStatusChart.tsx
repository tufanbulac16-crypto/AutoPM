import React from 'react';
import { BarChart3 } from 'lucide-react';

export const ProjectStatusChart: React.FC = () => {
  const statusData = [
    { status: 'Konsept', count: 2, color: 'bg-gray-500', percentage: 16.7 },
    { status: 'Tasarım', count: 3, color: 'bg-blue-500', percentage: 25 },
    { status: 'Prototip', count: 4, color: 'bg-yellow-500', percentage: 33.3 },
    { status: 'Doğrulama', count: 2, color: 'bg-orange-500', percentage: 16.7 },
    { status: 'SOP', count: 1, color: 'bg-green-500', percentage: 8.3 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Proje Durumu Dağılımı
        </h3>
        <BarChart3 className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        {statusData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.status}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.count} proje
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">12</span>
          <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Proje</p>
        </div>
      </div>
    </div>
  );
};
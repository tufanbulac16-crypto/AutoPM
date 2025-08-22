import React from 'react';
import { PieChart } from 'lucide-react';

export const TaskDistributionChart: React.FC = () => {
  const taskData = [
    { status: 'Yapılacak', count: 8, color: 'bg-gray-400', percentage: 32 },
    { status: 'Devam Ediyor', count: 12, color: 'bg-blue-500', percentage: 48 },
    { status: 'İnceleme', count: 3, color: 'bg-yellow-500', percentage: 12 },
    { status: 'Tamamlandı', count: 2, color: 'bg-green-500', percentage: 8 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Görev Dağılımı
        </h3>
        <PieChart className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="relative mb-6">
        <div className="w-32 h-32 mx-auto relative">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="dark:stroke-gray-700"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="48, 100"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">25</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Toplam</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {taskData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.status}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
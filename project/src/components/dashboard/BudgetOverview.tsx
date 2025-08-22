import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export const BudgetOverview: React.FC = () => {
  const budgetData = {
    total: 850000,
    spent: 382500,
    remaining: 467500,
    percentage: 45
  };

  const categories = [
    { name: 'Mühendislik', spent: 112500, budget: 250000, color: 'bg-blue-500' },
    { name: 'Malzeme', spent: 180000, budget: 400000, color: 'bg-green-500' },
    { name: 'Kalite', spent: 67500, budget: 150000, color: 'bg-yellow-500' },
    { name: 'Diğer', spent: 22500, budget: 50000, color: 'bg-purple-500' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Bütçe Özeti
        </h3>
        <DollarSign className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Bütçe</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {formatCurrency(budgetData.total)}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{ width: `${budgetData.percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Harcanan: {formatCurrency(budgetData.spent)}</span>
          <span>%{budgetData.percentage}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Kategori Bazlı Harcamalar
        </h4>
        {categories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {category.name}
                </span>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {formatCurrency(category.spent)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${category.color} transition-all duration-300`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Kalan Bütçe</span>
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              {formatCurrency(budgetData.remaining)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { PieChart } from 'lucide-react';
import type { Budget } from '../../types/project';

interface BudgetChartProps {
  budget: Budget;
}

export const BudgetChart: React.FC<BudgetChartProps> = ({ budget }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Bütçe Dağılımı
        </h3>
        <PieChart className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="relative mb-6">
        <div className="w-48 h-48 mx-auto relative">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
              className="dark:stroke-gray-700"
            />
            {budget.categories.map((category, index) => {
              const percentage = (category.spentAmount / budget.totalBudget) * 100;
              const offset = budget.categories.slice(0, index).reduce((acc, cat) => 
                acc + (cat.spentAmount / budget.totalBudget) * 100, 0
              );
              
              return (
                <path
                  key={category.id}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeWidth="3"
                  strokeDasharray={`${percentage}, 100`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                %{((budget.spentAmount / budget.totalBudget) * 100).toFixed(0)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Kullanıldı</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {budget.categories.map((category, index) => {
          const percentage = (category.spentAmount / budget.totalBudget) * 100;
          
          return (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(category.spentAmount)}
                </span>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  %{percentage.toFixed(1)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
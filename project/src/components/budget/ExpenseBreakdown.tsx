import React from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import type { Budget } from '../../types/project';

interface ExpenseBreakdownProps {
  budget: Budget;
}

export const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ budget }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const maxBudget = Math.max(...budget.categories.map(cat => cat.budgetedAmount));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Kategori Bazlı Harcamalar
        </h3>
        <BarChart3 className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="space-y-6">
        {budget.categories.map((category) => {
          const utilizationPercentage = (category.spentAmount / category.budgetedAmount) * 100;
          const budgetPercentage = (category.budgetedAmount / maxBudget) * 100;
          const spentPercentage = (category.spentAmount / maxBudget) * 100;
          const isOverBudget = category.spentAmount > category.budgetedAmount;
          
          return (
            <div key={category.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {category.name}
                </h4>
                <div className="flex items-center space-x-2">
                  {isOverBudget ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    %{utilizationPercentage.toFixed(1)}
                  </span>
                </div>
              </div>
              
              <div className="relative">
                {/* Budget bar (background) */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="h-6 bg-gray-300 dark:bg-gray-600 rounded-full"
                    style={{ width: `${budgetPercentage}%` }}
                  />
                  {/* Spent amount bar */}
                  <div
                    className={`absolute top-0 left-0 h-6 rounded-full transition-all duration-500 ${
                      isOverBudget ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(spentPercentage, budgetPercentage)}%` }}
                  />
                  {/* Over-budget indicator */}
                  {isOverBudget && (
                    <div
                      className="absolute top-0 h-6 bg-red-600 rounded-r-full"
                      style={{ 
                        left: `${budgetPercentage}%`,
                        width: `${spentPercentage - budgetPercentage}%`
                      }}
                    />
                  )}
                </div>
                
                {/* Labels */}
                <div className="flex justify-between mt-2 text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Harcanan: {formatCurrency(category.spentAmount)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-1"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Bütçe: {formatCurrency(category.budgetedAmount)}
                      </span>
                    </div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Kalan: {formatCurrency(Math.max(0, category.budgetedAmount - category.spentAmount))}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Toplam Harcama
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatCurrency(budget.spentAmount)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Toplam Bütçe
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {formatCurrency(budget.totalBudget)}
          </span>
        </div>
      </div>
    </div>
  );
};
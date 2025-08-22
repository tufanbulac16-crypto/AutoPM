import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Plus, PieChart } from 'lucide-react';
import { mockBudgets } from '../../data/mockData';
import { BudgetChart } from './BudgetChart';
import { ExpenseBreakdown } from './ExpenseBreakdown';

export const BudgetManager: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('1');
  
  const budget = mockBudgets.find(b => b.projectId === selectedProject);
  
  if (!budget) return null;

  const utilizationPercentage = (budget.spentAmount / budget.totalBudget) * 100;
  const remainingBudget = budget.totalBudget - budget.spentAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Bütçe & Finans
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Proje bütçesi ve maliyet takibi
          </p>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Harcama
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Toplam Bütçe
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(budget.totalBudget)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Harcanan
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(budget.spentAmount)}
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                %{utilizationPercentage.toFixed(1)} kullanıldı
              </p>
            </div>
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
              <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Kalan Bütçe
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {formatCurrency(remainingBudget)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                %{(100 - utilizationPercentage).toFixed(1)} kaldı
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Kategoriler
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {budget.categories.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Masraf kalemi
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <PieChart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BudgetChart budget={budget} />
        <ExpenseBreakdown budget={budget} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Kategori Detayları
        </h3>
        
        <div className="space-y-4">
          {budget.categories.map((category) => {
            const categoryUtilization = (category.spentAmount / category.budgetedAmount) * 100;
            
            return (
              <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {category.name}
                  </h4>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(category.spentAmount)} / {formatCurrency(category.budgetedAmount)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      %{categoryUtilization.toFixed(1)} kullanıldı
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      categoryUtilization > 90 ? 'bg-red-500' :
                      categoryUtilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(categoryUtilization, 100)}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {category.subcategories.map((sub) => {
                    const subUtilization = (sub.spentAmount / sub.budgetedAmount) * 100;
                    
                    return (
                      <div key={sub.id} className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {sub.name}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            %{subUtilization.toFixed(0)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {formatCurrency(sub.spentAmount)} / {formatCurrency(sub.budgetedAmount)}
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1 mt-2">
                          <div
                            className="h-1 rounded-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${Math.min(subUtilization, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
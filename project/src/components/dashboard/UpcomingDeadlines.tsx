import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';
import { mockTasks } from '../../data/mockData';

export const UpcomingDeadlines: React.FC = () => {
  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-green-600 dark:text-green-400';
    }
  };

  const sortedTasks = mockTasks
    .map(task => ({
      ...task,
      daysUntilDue: getDaysUntilDue(task.dueDate)
    }))
    .sort((a, b) => a.daysUntilDue - b.daysUntilDue);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Yaklaşan Teslim Tarihleri
        </h3>
        <Calendar className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        {sortedTasks.slice(0, 5).map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                {task.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {task.assignedTo} • {task.department}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              {task.daysUntilDue <= 3 && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                {task.daysUntilDue > 0 ? `${task.daysUntilDue} gün` : 'Gecikmiş'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
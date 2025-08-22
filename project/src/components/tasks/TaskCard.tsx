import React from 'react';
import { Calendar, User, MessageCircle, Paperclip } from 'lucide-react';
import { Task } from '../../types/project';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500';
      case 'high': return 'border-l-orange-500';
      case 'medium': return 'border-l-yellow-500';
      default: return 'border-l-green-500';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critical': return 'Kritik';
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      default: return 'Düşük';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 ${getPriorityColor(task.priority)} shadow-sm hover:shadow-md transition-shadow cursor-pointer`}>
      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
            {task.title}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {task.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
            {getPriorityText(task.priority)}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {task.department}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <User className="h-3 w-3 mr-1" />
            {task.assignedTo}
          </div>
          
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(task.dueDate)}
          </div>
        </div>

        {(task.comments || task.files) && (
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
            {task.comments && (
              <div className="flex items-center">
                <MessageCircle className="h-3 w-3 mr-1" />
                {task.comments.length}
              </div>
            )}
            {task.files && (
              <div className="flex items-center">
                <Paperclip className="h-3 w-3 mr-1" />
                {task.files.length}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
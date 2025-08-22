import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, User } from 'lucide-react';
import { mockTasks } from '../../data/mockData';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';

export const TaskManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    review: filteredTasks.filter(task => task.status === 'review'),
    completed: filteredTasks.filter(task => task.status === 'completed')
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Görev Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Görevleri takip edin ve yönetin
          </p>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Görev
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Görev ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtrele
        </button>
      </div>

      {showFilters && (
        <TaskFilters
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Yapılacak ({tasksByStatus.todo.length})
            </h3>
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          </div>
          {tasksByStatus.todo.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Devam Ediyor ({tasksByStatus['in-progress'].length})
            </h3>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
          {tasksByStatus['in-progress'].map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              İnceleme ({tasksByStatus.review.length})
            </h3>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          </div>
          {tasksByStatus.review.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Tamamlandı ({tasksByStatus.completed.length})
            </h3>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          {tasksByStatus.completed.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};
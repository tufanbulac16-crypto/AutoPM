import React, { useState } from 'react';
import { Calendar, Plus, Edit, Save, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockProjects } from '../../data/mockData';

interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies: string[];
  assignee: string;
  projectId: string;
  phase: string;
}

export const GanttChart: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('all');
  const [viewMode, setViewMode] = useState<'weeks' | 'quarters'>('weeks');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState<GanttTask[]>([
    {
      id: '1',
      name: 'Konsept Geliştirme',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      progress: 100,
      dependencies: [],
      assignee: 'Ahmet Kaya',
      projectId: '1',
      phase: 'concept'
    },
    {
      id: '2',
      name: 'CAD Tasarım',
      startDate: '2024-02-16',
      endDate: '2024-04-15',
      progress: 75,
      dependencies: ['1'],
      assignee: 'Elif Demir',
      projectId: '1',
      phase: 'design'
    },
    {
      id: '3',
      name: 'Prototip Üretimi',
      startDate: '2024-04-16',
      endDate: '2024-06-01',
      progress: 30,
      dependencies: ['2'],
      assignee: 'Ali Yılmaz',
      projectId: '1',
      phase: 'proto'
    },
    {
      id: '4',
      name: 'Kalite Doğrulama',
      startDate: '2024-06-02',
      endDate: '2024-07-15',
      progress: 0,
      dependencies: ['3'],
      assignee: 'Mehmet Öz',
      projectId: '1',
      phase: 'validation'
    }
  ]);

  const [newTask, setNewTask] = useState({
    name: '',
    startDate: '',
    endDate: '',
    assignee: '',
    phase: 'concept'
  });

  const filteredTasks = selectedProject === 'all' 
    ? tasks 
    : tasks.filter(task => task.projectId === selectedProject);

  const selectedProjectData = mockProjects.find(p => p.id === selectedProject);

  const getDateRange = () => {
    if (selectedProject === 'all' || !selectedProjectData) {
      const start = new Date();
      start.setMonth(start.getMonth() - 3);
      const end = new Date();
      end.setMonth(end.getMonth() + 9);
      return { start, end };
    }
    
    const start = new Date(selectedProjectData.startDate);
    const end = new Date(selectedProjectData.endDate);
    return { start, end };
  };

  const generateTimeColumns = () => {
    const { start, end } = getDateRange();
    const columns = [];
    const current = new Date(start);

    while (current <= end) {
      if (viewMode === 'quarters') {
        columns.push(new Date(current));
        current.setMonth(current.getMonth() + 3);
      } else {
        columns.push(new Date(current));
        current.setDate(current.getDate() + 7);
      }
    }
    return columns;
  };

  const getTaskPosition = (task: GanttTask) => {
    const { start } = getDateRange();
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    const totalRangeDays = Math.ceil((getDateRange().end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24));
    const startOffset = Math.ceil((taskStart.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      left: `${(startOffset / totalRangeDays) * 100}%`,
      width: `${(totalDays / totalRangeDays) * 100}%`
    };
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'concept': return 'bg-gray-500';
      case 'design': return 'bg-blue-500';
      case 'proto': return 'bg-yellow-500';
      case 'validation': return 'bg-orange-500';
      case 'sop': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const updateTask = (taskId: string, updates: Partial<GanttTask>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const addTask = () => {
    if (newTask.name && newTask.startDate && newTask.endDate) {
      const task: GanttTask = {
        id: Date.now().toString(),
        ...newTask,
        progress: 0,
        dependencies: [],
        projectId: selectedProject === 'all' ? '1' : selectedProject
      };
      setTasks([...tasks, task]);
      setNewTask({ name: '', startDate: '', endDate: '', assignee: '', phase: 'concept' });
      setShowAddTask(false);
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const timeColumns = generateTimeColumns();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Zaman Planı
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Proje zaman çizelgesi ve Gantt görünümü
          </p>
        </div>
        
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Görev
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tüm Projeler</option>
              {mockProjects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('weeks')}
                className={`px-3 py-1 rounded ${viewMode === 'weeks' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Haftalar
              </button>
              <button
                onClick={() => setViewMode('quarters')}
                className={`px-3 py-1 rounded ${viewMode === 'quarters' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                Çeyrekler
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Timeline Header */}
            <div className="grid grid-cols-12 gap-1 mb-4">
              <div className="col-span-4 text-sm font-medium text-gray-700 dark:text-gray-300 p-2">
                Görev
              </div>
              <div className="col-span-8 grid grid-cols-12 gap-1">
                {timeColumns.slice(0, 12).map((date, index) => (
                  <div key={index} className="text-xs text-center text-gray-600 dark:text-gray-400 p-1">
                    {viewMode === 'quarters' 
                      ? `Q${Math.floor(date.getMonth() / 3) + 1} ${date.getFullYear()}`
                      : `${date.getDate()}/${date.getMonth() + 1}`
                    }
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {filteredTasks.map((task) => (
                <div key={task.id} className="grid grid-cols-12 gap-1 items-center">
                  <div className="col-span-4 p-2">
                    {editingTask === task.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={task.name}
                          onChange={(e) => updateTask(task.id, { name: e.target.value })}
                          className="w-full px-2 py-1 text-sm border rounded"
                        />
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setEditingTask(null)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded"
                          >
                            <Save className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-red-600 hover:bg-red-100 rounded"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => setEditingTask(task.id)}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
                      >
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {task.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {task.assignee}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="col-span-8 relative h-8">
                    <div
                      className={`absolute h-6 rounded ${getPhaseColor(task.phase)} opacity-80 flex items-center justify-center`}
                      style={getTaskPosition(task)}
                    >
                      <div
                        className="h-full bg-white bg-opacity-30 rounded-l"
                        style={{ width: `${task.progress}%` }}
                      />
                      <span className="text-xs text-white font-medium px-2">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Yeni Görev Ekle
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Görev adı"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newTask.startDate}
                  onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="date"
                  value={newTask.endDate}
                  onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <input
                type="text"
                placeholder="Sorumlu kişi"
                value={newTask.assignee}
                onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              
              <select
                value={newTask.phase}
                onChange={(e) => setNewTask({ ...newTask, phase: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="concept">Konsept</option>
                <option value="design">Tasarım</option>
                <option value="proto">Prototip</option>
                <option value="validation">Doğrulama</option>
                <option value="sop">SOP</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                İptal
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
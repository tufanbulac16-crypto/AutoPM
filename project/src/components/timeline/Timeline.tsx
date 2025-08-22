import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { mockProjects } from '../../data/mockData';

export const Timeline: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('all');

  const phases = [
    { id: 'concept', name: 'Konsept', color: 'bg-gray-500' },
    { id: 'design', name: 'Tasarım', color: 'bg-blue-500' },
    { id: 'proto', name: 'Prototip', color: 'bg-yellow-500' },
    { id: 'validation', name: 'Doğrulama', color: 'bg-orange-500' },
    { id: 'sop', name: 'SOP', color: 'bg-green-500' }
  ];

  const getPhaseStatus = (phase: any) => {
    if (phase.completed) return 'completed';
    const dueDate = new Date(phase.dueDate);
    const now = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'overdue';
    if (daysUntilDue <= 7) return 'warning';
    return 'normal';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const filteredProjects = selectedProject === 'all' 
    ? mockProjects 
    : mockProjects.filter(p => p.id === selectedProject);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Zaman Çizelgesi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Proje fazları ve kritik yol analizi
          </p>
        </div>
        
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Projeler</option>
          {mockProjects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            APQP Faz Durumları
          </h3>
          <div className="flex flex-wrap gap-4 mb-6">
            {phases.map(phase => (
              <div key={phase.id} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${phase.color} mr-2`}></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{phase.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {project.name}
                </h4>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {project.customer}
                </span>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(project.startDate).toLocaleDateString('tr-TR')}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(project.endDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  {Object.entries(project.phase.phases).map(([phaseId, phase], index) => {
                    const phaseInfo = phases.find(p => p.id === phaseId);
                    const status = getPhaseStatus(phase);
                    const width = 100 / Object.keys(project.phase.phases).length;
                    
                    return (
                      <div
                        key={phaseId}
                        className={`absolute h-full ${phaseInfo?.color} ${
                          phase.completed ? 'opacity-100' : 'opacity-50'
                        } transition-all duration-300`}
                        style={{
                          left: `${index * width}%`,
                          width: `${width}%`
                        }}
                      >
                        <div className="flex items-center justify-center h-full">
                          {getStatusIcon(status)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex justify-between mt-2">
                  {Object.entries(project.phase.phases).map(([phaseId, phase]) => (
                    <div key={phaseId} className="text-center flex-1">
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {phase.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(phase.dueDate).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
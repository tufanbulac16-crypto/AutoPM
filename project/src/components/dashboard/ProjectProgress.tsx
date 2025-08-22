import React from 'react';
import { mockProjects } from '../../data/mockData';

export const ProjectProgress: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concept': return 'bg-gray-500';
      case 'design': return 'bg-blue-500';
      case 'proto': return 'bg-yellow-500';
      case 'validation': return 'bg-orange-500';
      case 'sop': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'concept': return 'Konsept';
      case 'design': return 'Tasarım';
      case 'proto': return 'Prototip';
      case 'validation': return 'Doğrulama';
      case 'sop': return 'SOP';
      default: return status;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Proje İlerlemesi
      </h3>
      
      <div className="space-y-4">
        {mockProjects.map((project) => (
          <div key={project.id} className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {project.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {project.customer}
                </p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded text-xs text-white ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                  %{project.progress}
                </p>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getStatusColor(project.status)}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { Calendar, Users, TrendingUp, AlertTriangle, Trash2, Edit } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onDelete?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concept': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'design': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'proto': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'validation': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'sop': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-green-600 dark:text-green-400';
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {project.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {project.customer}
          </p>
        </div>
        
        <div className="flex items-center space-x-2 relative group">
          {project.priority === 'critical' && (
            <AlertTriangle className="h-4 w-4 text-red-500" />
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </span>
          {onDelete && (
            <button
              onClick={onDelete}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all duration-200"
              title="Projeyi Sil"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date(project.startDate).toLocaleDateString('tr-TR')} - {new Date(project.endDate).toLocaleDateString('tr-TR')}
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Users className="h-4 w-4 mr-2" />
          {project.team.length} kişi
        </div>
        
        <div className="flex items-center text-sm">
          <TrendingUp className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-400 mr-2">İlerleme:</span>
          <span className="font-semibold text-gray-900 dark:text-white">%{project.progress}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs">
          <span className={`font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority === 'critical' ? 'Kritik' : 
             project.priority === 'high' ? 'Yüksek' :
             project.priority === 'medium' ? 'Orta' : 'Düşük'}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            %{project.progress} tamamlandı
          </span>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { BarChart3, Calendar, Users, DollarSign, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockProjects, mockTasks, mockBudgets } from '../../data/mockData';

export const ProjectSummary: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]?.id || '1');
  
  const project = mockProjects.find(p => p.id === selectedProject);
  const projectTasks = mockTasks.filter(t => t.projectId === selectedProject);
  const projectBudget = mockBudgets.find(b => b.projectId === selectedProject);

  if (!project) return null;

  const taskStats = {
    total: projectTasks.length,
    completed: projectTasks.filter(t => t.status === 'completed').length,
    inProgress: projectTasks.filter(t => t.status === 'in-progress').length,
    overdue: projectTasks.filter(t => {
      const dueDate = new Date(t.dueDate);
      const now = new Date();
      return dueDate < now && t.status !== 'completed';
    }).length
  };

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const daysUntilDeadline = Math.ceil(
    (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Proje Özeti
        </h3>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          {mockProjects.map(proj => (
            <option key={proj.id} value={proj.id}>{proj.name}</option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {/* Project Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">
              {project.name}
            </h4>
            <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getStatusColor(project.status)}`}>
              {getStatusText(project.status)}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            Müşteri: {project.customer}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Calendar className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Başlangıç</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(project.startDate).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <div className="text-center">
              <Calendar className="h-5 w-5 text-red-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Bitiş</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {new Date(project.endDate).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Kalan Gün</p>
              <p className={`text-sm font-medium ${daysUntilDeadline < 30 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                {daysUntilDeadline > 0 ? `${daysUntilDeadline} gün` : 'Gecikmiş'}
              </p>
            </div>
            <div className="text-center">
              <Users className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Ekip</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {project.team.length} kişi
              </p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Proje İlerlemesi
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              %{project.progress}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${getStatusColor(project.status)} transition-all duration-500`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Task Statistics */}
        <div>
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Görev Durumu
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900 dark:text-white">{taskStats.total}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Toplam</p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{taskStats.completed}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Tamamlandı</p>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{taskStats.inProgress}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Devam Ediyor</p>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-red-600 dark:text-red-400">{taskStats.overdue}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Gecikmiş</p>
            </div>
          </div>
        </div>

        {/* Budget Summary */}
        {projectBudget && (
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Bütçe Durumu
            </h5>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(projectBudget.totalBudget)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Toplam Bütçe</p>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-red-500 mx-auto mb-1" />
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(projectBudget.spentAmount)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Harcanan</p>
              </div>
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-500 mx-auto mb-1" />
                <p className="text-sm font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(projectBudget.totalBudget - projectBudget.spentAmount)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Kalan</p>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Bütçe Kullanımı</span>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  %{((projectBudget.spentAmount / projectBudget.totalBudget) * 100).toFixed(1)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-500"
                  style={{ width: `${(projectBudget.spentAmount / projectBudget.totalBudget) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Team Members */}
        <div>
          <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Proje Ekibi
          </h5>
          <div className="space-y-2">
            {project.team.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {member.role === 'project-manager' ? 'Proje Yöneticisi' :
                     member.role === 'engineer' ? 'Mühendis' :
                     member.role === 'quality' ? 'Kalite Uzmanı' :
                     member.role === 'logistics' ? 'Lojistik Uzmanı' : 'Müşteri Temsilcisi'}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
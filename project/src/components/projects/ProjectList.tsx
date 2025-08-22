import React, { useState } from 'react';
import { Plus, Search, Filter, Trash2, AlertTriangle } from 'lucide-react';
import { mockProjects } from '../../data/mockData';
import { ProjectCard } from './ProjectCard';
import { NewProjectModal } from './NewProjectModal';
import type { Project } from '../../types/project';

export const ProjectList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showClearDataModal, setShowClearDataModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const addProject = (newProject: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      progress: 0,
      team: [],
      phase: {
        current: 'concept',
        phases: {
          concept: { name: 'Konsept', completed: false, dueDate: newProject.startDate },
          design: { name: 'Tasarım', completed: false, dueDate: newProject.startDate },
          proto: { name: 'Prototip', completed: false, dueDate: newProject.startDate },
          validation: { name: 'Doğrulama', completed: false, dueDate: newProject.startDate },
          sop: { name: 'SOP', completed: false, dueDate: newProject.endDate },
        }
      }
    };
    setProjects([...projects, project]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setProjectToDelete(null);
  };

  const clearAllData = () => {
    setProjects([]);
    setShowClearDataModal(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Projeler
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tüm projeleri yönetin ve takip edin
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowClearDataModal(true)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Örnek Verileri Temizle
          </button>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Proje
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Proje veya müşteri ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center">
          <Filter className="h-4 w-4 text-gray-400 mr-2" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="concept">Konsept</option>
            <option value="design">Tasarım</option>
            <option value="proto">Prototip</option>
            <option value="validation">Doğrulama</option>
            <option value="sop">SOP</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onDelete={() => setProjectToDelete(project.id)}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Plus className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Henüz proje bulunmuyor
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            İlk projenizi oluşturmak için "Yeni Proje" butonuna tıklayın.
          </p>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            İlk Projenizi Oluşturun
          </button>
        </div>
      )}
      {showNewProjectModal && (
        <NewProjectModal 
          onClose={() => setShowNewProjectModal(false)}
          onSave={addProject}
        />
      )}

      {/* Clear Data Confirmation Modal */}
      {showClearDataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Örnek Verileri Temizle
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Bu işlem tüm örnek projeleri ve ilgili verileri kalıcı olarak silecektir. 
                Bu işlem geri alınamaz.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowClearDataModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={clearAllData}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Temizle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Project Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Projeyi Sil
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve 
                projeye ait tüm görevler, dokümanlar ve veriler silinecektir.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Uyarı:</strong> Bu işlem kalıcıdır ve geri alınamaz.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setProjectToDelete(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={() => deleteProject(projectToDelete)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Projeyi Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
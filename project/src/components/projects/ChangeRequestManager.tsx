import React, { useState } from 'react';
import { Plus, Search, FileText, Clock, CheckCircle, XCircle, AlertTriangle, DollarSign, Calendar, User } from 'lucide-react';
import { mockProjects } from '../../data/mockData';
import type { ChangeRequest } from '../../types/project';

export const ChangeRequestManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);

  const [changeRequests, setChangeRequests] = useState<ChangeRequest[]>([
    {
      id: '1',
      projectId: '1',
      title: 'Fren Kaliperi Malzeme Değişikliği',
      description: 'Müşteri tarafından talep edilen malzeme değişikliği - Çelik yerine alüminyum kullanımı',
      requestedBy: 'BMW Müşteri Temsilcisi',
      requestDate: '2024-03-15',
      status: 'pending',
      priority: 'high',
      impactAssessment: {
        cost: 25000,
        timeline: 14,
        scope: 'Tasarım revizyonu ve test süreçleri'
      },
      comments: [
        {
          id: '1',
          author: 'Ahmet Kaya',
          content: 'Maliyet analizi tamamlandı, müşteri onayı bekleniyor.',
          timestamp: '2024-03-16T10:30:00Z'
        }
      ]
    },
    {
      id: '2',
      projectId: '2',
      title: 'Kaporta Boyut Değişikliği',
      description: 'Montaj hattı uyumluluğu için boyut ayarlaması gerekiyor',
      requestedBy: 'Mercedes Üretim Ekibi',
      requestDate: '2024-03-10',
      status: 'approved',
      priority: 'medium',
      impactAssessment: {
        cost: 15000,
        timeline: 7,
        scope: 'CAD revizyonu ve fikstür güncellemesi'
      },
      approvedBy: 'Fatma Şen',
      approvalDate: '2024-03-12',
      comments: []
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    projectId: '1',
    priority: 'medium' as ChangeRequest['priority'],
    impactCost: 0,
    impactTimeline: 0,
    impactScope: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'implemented': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'implemented': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Bekliyor';
      case 'approved': return 'Onaylandı';
      case 'rejected': return 'Reddedildi';
      case 'implemented': return 'Uygulandı';
      default: return status;
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredRequests = changeRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesProject = projectFilter === 'all' || request.projectId === projectFilter;
    return matchesSearch && matchesStatus && matchesProject;
  });

  const addChangeRequest = () => {
    if (newRequest.title && newRequest.description) {
      const request: ChangeRequest = {
        id: Date.now().toString(),
        ...newRequest,
        requestedBy: 'Admin User',
        requestDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        impactAssessment: {
          cost: newRequest.impactCost,
          timeline: newRequest.impactTimeline,
          scope: newRequest.impactScope
        },
        comments: []
      };
      setChangeRequests([...changeRequests, request]);
      setNewRequest({
        title: '',
        description: '',
        projectId: '1',
        priority: 'medium',
        impactCost: 0,
        impactTimeline: 0,
        impactScope: ''
      });
      setShowNewRequestModal(false);
    }
  };

  const updateRequestStatus = (id: string, status: ChangeRequest['status']) => {
    setChangeRequests(changeRequests.map(request => 
      request.id === id ? { 
        ...request, 
        status,
        approvedBy: status === 'approved' ? 'Admin User' : undefined,
        approvalDate: status === 'approved' ? new Date().toISOString().split('T')[0] : undefined
      } : request
    ));
  };

  const requestStats = {
    total: changeRequests.length,
    pending: changeRequests.filter(r => r.status === 'pending').length,
    approved: changeRequests.filter(r => r.status === 'approved').length,
    implemented: changeRequests.filter(r => r.status === 'implemented').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Değişiklik Talepleri
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Müşteri değişiklik talepleri ve etki analizi
          </p>
        </div>
        
        <button
          onClick={() => setShowNewRequestModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Talep
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{requestStats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Talep</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{requestStats.pending}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bekliyor</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{requestStats.approved}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Onaylandı</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{requestStats.implemented}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Uygulandı</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Değişiklik talebi ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Projeler</option>
          {mockProjects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Bekliyor</option>
          <option value="approved">Onaylandı</option>
          <option value="rejected">Reddedildi</option>
          <option value="implemented">Uygulandı</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => {
          const project = mockProjects.find(p => p.id === request.projectId);
          
          return (
            <div key={request.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {request.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {project?.name} • {request.requestedBy}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(request.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {request.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(request.impactAssessment.cost)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Maliyet</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {request.impactAssessment.timeline} gün
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Süre</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <AlertTriangle className={`h-5 w-5 mx-auto mb-1 ${getPriorityColor(request.priority)}`} />
                  <p className={`text-sm font-medium ${getPriorityColor(request.priority)}`}>
                    {getPriorityText(request.priority)}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Öncelik</p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Talep Tarihi: {new Date(request.requestDate).toLocaleDateString('tr-TR')}
                  </span>
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateRequestStatus(request.id, 'approved')}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors"
                      >
                        Onayla
                      </button>
                      <button
                        onClick={() => updateRequestStatus(request.id, 'rejected')}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                      >
                        Reddet
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* New Change Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Yeni Değişiklik Talebi
                </h2>
                <button
                  onClick={() => setShowNewRequestModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Proje
                  </label>
                  <select
                    value={newRequest.projectId}
                    onChange={(e) => setNewRequest({ ...newRequest, projectId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {mockProjects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Talep Başlığı
                  </label>
                  <input
                    type="text"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Değişiklik talebi başlığı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    rows={4}
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Değişiklik talebi detayları..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Öncelik
                    </label>
                    <select
                      value={newRequest.priority}
                      onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value as ChangeRequest['priority'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Düşük</option>
                      <option value="medium">Orta</option>
                      <option value="high">Yüksek</option>
                      <option value="critical">Kritik</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tahmini Maliyet (₺)
                    </label>
                    <input
                      type="number"
                      value={newRequest.impactCost}
                      onChange={(e) => setNewRequest({ ...newRequest, impactCost: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tahmini Süre (gün)
                    </label>
                    <input
                      type="number"
                      value={newRequest.impactTimeline}
                      onChange={(e) => setNewRequest({ ...newRequest, impactTimeline: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Etki Kapsamı
                    </label>
                    <input
                      type="text"
                      value={newRequest.impactScope}
                      onChange={(e) => setNewRequest({ ...newRequest, impactScope: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Etkilenecek alanlar"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setShowNewRequestModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={addChangeRequest}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Talep Oluştur
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
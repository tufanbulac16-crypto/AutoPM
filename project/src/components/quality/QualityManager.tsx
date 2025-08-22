import React, { useState } from 'react';
import { Plus, Search, Filter, Shield, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { mockQualityRecords } from '../../data/mockData';

export const QualityManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'ppap': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'cmm': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'fai': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case '8d': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'non-conformance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'in-review': return <FileText className="h-4 w-4 text-yellow-500" />;
      default: return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'ppap': return 'PPAP';
      case 'cmm': return 'CMM Ölçüm';
      case 'fai': return 'FAI Raporu';
      case '8d': return '8D Raporu';
      case 'non-conformance': return 'Uygunsuzluk';
      default: return type;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Bekliyor';
      case 'approved': return 'Onaylandı';
      case 'rejected': return 'Reddedildi';
      case 'in-review': return 'İnceleniyor';
      default: return status;
    }
  };

  const filteredRecords = mockQualityRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kalite Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kalite kontrol süreçleri ve dokümanları
          </p>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Kayıt
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Kayıt</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Onaylandı</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">İnceleniyor</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bekliyor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Kalite kaydı ara..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Tipler</option>
          <option value="ppap">PPAP</option>
          <option value="cmm">CMM Ölçüm</option>
          <option value="fai">FAI Raporu</option>
          <option value="8d">8D Raporu</option>
          <option value="non-conformance">Uygunsuzluk</option>
        </select>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Bekliyor</option>
          <option value="in-review">İnceleniyor</option>
          <option value="approved">Onaylandı</option>
          <option value="rejected">Reddedildi</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record) => (
          <div key={record.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(record.type)}`}>
                {getTypeText(record.type)}
              </span>
              {getStatusIcon(record.status)}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {record.title}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {record.description}
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Sorumlu:</span>
                <span className="text-gray-900 dark:text-white">{record.assignedTo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Durum:</span>
                <span className="text-gray-900 dark:text-white">{getStatusText(record.status)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Teslim:</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date(record.dueDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
              {record.files.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Dosyalar:</span>
                  <span className="text-gray-900 dark:text-white">{record.files.length} dosya</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
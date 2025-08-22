import React, { useState } from 'react';
import { Plus, Search, FileText, Download, Eye, Lock, Globe, Users } from 'lucide-react';
import { mockDocuments } from '../../data/mockData';

export const DocumentManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [accessFilter, setAccessFilter] = useState('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cad': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'drawing': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'report': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'specification': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getAccessIcon = (accessLevel: string) => {
    switch (accessLevel) {
      case 'public': return <Globe className="h-4 w-4 text-green-500" />;
      case 'internal': return <Users className="h-4 w-4 text-blue-500" />;
      case 'restricted': return <Lock className="h-4 w-4 text-red-500" />;
      default: return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'cad': return 'CAD Dosyası';
      case 'drawing': return 'Teknik Çizim';
      case 'report': return 'Rapor';
      case 'specification': return 'Şartname';
      default: return 'Diğer';
    }
  };

  const getAccessText = (accessLevel: string) => {
    switch (accessLevel) {
      case 'public': return 'Herkese Açık';
      case 'internal': return 'İç Kullanım';
      case 'restricted': return 'Kısıtlı';
      default: return accessLevel;
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesAccess = accessFilter === 'all' || doc.accessLevel === accessFilter;
    return matchesSearch && matchesType && matchesAccess;
  });

  const documentStats = {
    total: mockDocuments.length,
    cad: mockDocuments.filter(doc => doc.type === 'cad').length,
    drawings: mockDocuments.filter(doc => doc.type === 'drawing').length,
    reports: mockDocuments.filter(doc => doc.type === 'report').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Doküman Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Proje dokümanları ve versiyon kontrolü
          </p>
        </div>
        
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Doküman Yükle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{documentStats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Doküman</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{documentStats.cad}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">CAD Dosyası</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{documentStats.drawings}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Teknik Çizim</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{documentStats.reports}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rapor</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Doküman ara..."
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
          <option value="cad">CAD Dosyası</option>
          <option value="drawing">Teknik Çizim</option>
          <option value="report">Rapor</option>
          <option value="specification">Şartname</option>
          <option value="other">Diğer</option>
        </select>
        
        <select
          value={accessFilter}
          onChange={(e) => setAccessFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Erişim Seviyeleri</option>
          <option value="public">Herkese Açık</option>
          <option value="internal">İç Kullanım</option>
          <option value="restricted">Kısıtlı</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Doküman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Versiyon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Yükleyen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Erişim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Boyut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {doc.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(doc.uploadDate).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(doc.type)}`}>
                      {getTypeText(doc.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {doc.version}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {doc.uploadedBy}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getAccessIcon(doc.accessLevel)}
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {getAccessText(doc.accessLevel)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {doc.size}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
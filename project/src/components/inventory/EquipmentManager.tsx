import React, { useState } from 'react';
import { Plus, Search, Filter, Wrench, CheckCircle, Clock, AlertTriangle, DollarSign, Edit, Save, X } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  type: 'mold' | 'fixture' | 'tool' | 'gauge';
  projectId: string;
  supplier: string;
  orderDate: string;
  deliveryDate: string;
  cost: number;
  productionStatus: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  paymentStatus: 'not-paid' | 'partial' | 'completed';
  description: string;
  specifications: string;
  lastUpdated: string;
}

export const EquipmentManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'BMW X5 Fren Kaliperi Kalıbı',
      type: 'mold',
      projectId: '1',
      supplier: 'ABC Kalıp San.',
      orderDate: '2024-02-01',
      deliveryDate: '2024-04-15',
      cost: 125000,
      productionStatus: 'in-progress',
      paymentStatus: 'partial',
      description: 'Fren kaliperi üretimi için ana kalıp',
      specifications: 'Malzeme: P20 Çelik, Sertlik: 28-32 HRC',
      lastUpdated: '2024-03-10'
    },
    {
      id: '2',
      name: 'Mercedes Sprinter Kaporta Fikstürü',
      type: 'fixture',
      projectId: '2',
      supplier: 'XYZ Fikstür Ltd.',
      orderDate: '2024-01-15',
      deliveryDate: '2024-03-30',
      cost: 85000,
      productionStatus: 'completed',
      paymentStatus: 'completed',
      description: 'Kaporta montaj fikstürü',
      specifications: 'Alüminyum profil, Pnömatik kıskaçlar',
      lastUpdated: '2024-03-08'
    }
  ]);

  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: 'mold' as Equipment['type'],
    projectId: '1',
    supplier: '',
    orderDate: '',
    deliveryDate: '',
    cost: 0,
    description: '',
    specifications: ''
  });

  const projects = [
    { id: '1', name: 'BMW X5 Fren Sistemi' },
    { id: '2', name: 'Mercedes Sprinter Kaporta' }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mold': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'fixture': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'tool': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'gauge': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'delayed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'partial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default: return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'mold': return 'Kalıp';
      case 'fixture': return 'Fikstür';
      case 'tool': return 'Takım';
      case 'gauge': return 'Ölçü Aleti';
      default: return type;
    }
  };

  const getProductionStatusText = (status: string) => {
    switch (status) {
      case 'not-started': return 'Başlamadı';
      case 'in-progress': return 'Devam Ediyor';
      case 'completed': return 'Tamamlandı';
      case 'delayed': return 'Gecikmiş';
      default: return status;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'not-paid': return 'Ödenmedi';
      case 'partial': return 'Kısmi Ödendi';
      case 'completed': return 'Tamamlandı';
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

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = projectFilter === 'all' || item.projectId === projectFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.productionStatus === statusFilter;
    return matchesSearch && matchesProject && matchesType && matchesStatus;
  });

  const addEquipment = () => {
    if (newEquipment.name && newEquipment.supplier) {
      const equipment_item: Equipment = {
        id: Date.now().toString(),
        ...newEquipment,
        productionStatus: 'not-started',
        paymentStatus: 'not-paid',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setEquipment([...equipment, equipment_item]);
      setNewEquipment({
        name: '',
        type: 'mold',
        projectId: '1',
        supplier: '',
        orderDate: '',
        deliveryDate: '',
        cost: 0,
        description: '',
        specifications: ''
      });
      setShowAddModal(false);
    }
  };

  const updateEquipment = (id: string, updates: Partial<Equipment>) => {
    setEquipment(equipment.map(item => 
      item.id === id ? { ...item, ...updates, lastUpdated: new Date().toISOString().split('T')[0] } : item
    ));
  };

  const deleteEquipment = (id: string) => {
    setEquipment(equipment.filter(item => item.id !== id));
  };

  const equipmentStats = {
    total: equipment.length,
    completed: equipment.filter(e => e.productionStatus === 'completed').length,
    inProgress: equipment.filter(e => e.productionStatus === 'in-progress').length,
    delayed: equipment.filter(e => e.productionStatus === 'delayed').length,
    totalCost: equipment.reduce((sum, e) => sum + e.cost, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Ekipman Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kalıp, fikstür ve takım yönetimi
          </p>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Ekipman
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Wrench className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{equipmentStats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Ekipman</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{equipmentStats.completed}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tamamlandı</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{equipmentStats.inProgress}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Devam Ediyor</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{equipmentStats.delayed}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gecikmiş</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(equipmentStats.totalCost)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Maliyet</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Ekipman veya tedarikçi ara..."
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
          {projects.map(project => (
            <option key={project.id} value={project.id}>{project.name}</option>
          ))}
        </select>
        
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Tipler</option>
          <option value="mold">Kalıp</option>
          <option value="fixture">Fikstür</option>
          <option value="tool">Takım</option>
          <option value="gauge">Ölçü Aleti</option>
        </select>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="not-started">Başlamadı</option>
          <option value="in-progress">Devam Ediyor</option>
          <option value="completed">Tamamlandı</option>
          <option value="delayed">Gecikmiş</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {projectFilter === 'all' ? 'Tüm Projeler' : projects.find(p => p.id === projectFilter)?.name} - BOM Listesi
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Proje ekipmanları ve üretim durumu
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  BOM No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ekipman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tedarikçi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Üretim Durumu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ödeme Durumu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Maliyet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Teslim Tarihi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredEquipment.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">
                    BOM-{String(index + 1).padStart(3, '0')}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {projects.find(p => p.id === item.projectId)?.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(item.type)}`}>
                      {getTypeText(item.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(item.productionStatus)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProductionStatusColor(item.productionStatus)}`}>
                        {getProductionStatusText(item.productionStatus)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(item.paymentStatus)}`}>
                      {getPaymentStatusText(item.paymentStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {formatCurrency(item.cost)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {new Date(item.deliveryDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteEquipment(item.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Yeni Ekipman Ekle
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Ekipman Adı
                  </label>
                  <input
                    type="text"
                    value={newEquipment.name}
                    onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Örn: BMW X5 Fren Kaliperi Kalıbı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tip
                  </label>
                  <select
                    value={newEquipment.type}
                    onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value as Equipment['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mold">Kalıp</option>
                    <option value="fixture">Fikstür</option>
                    <option value="tool">Takım</option>
                    <option value="gauge">Ölçü Aleti</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Proje
                  </label>
                  <select
                    value={newEquipment.projectId}
                    onChange={(e) => setNewEquipment({ ...newEquipment, projectId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tedarikçi
                  </label>
                  <input
                    type="text"
                    value={newEquipment.supplier}
                    onChange={(e) => setNewEquipment({ ...newEquipment, supplier: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Tedarikçi adı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maliyet (₺)
                  </label>
                  <input
                    type="number"
                    value={newEquipment.cost}
                    onChange={(e) => setNewEquipment({ ...newEquipment, cost: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sipariş Tarihi
                  </label>
                  <input
                    type="date"
                    value={newEquipment.orderDate}
                    onChange={(e) => setNewEquipment({ ...newEquipment, orderDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Teslim Tarihi
                  </label>
                  <input
                    type="date"
                    value={newEquipment.deliveryDate}
                    onChange={(e) => setNewEquipment({ ...newEquipment, deliveryDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    rows={2}
                    value={newEquipment.description}
                    onChange={(e) => setNewEquipment({ ...newEquipment, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Ekipman açıklaması..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Teknik Özellikler
                  </label>
                  <textarea
                    rows={2}
                    value={newEquipment.specifications}
                    onChange={(e) => setNewEquipment({ ...newEquipment, specifications: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Teknik özellikler..."
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={addEquipment}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
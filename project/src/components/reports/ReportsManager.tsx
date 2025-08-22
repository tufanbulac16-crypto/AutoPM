import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, TrendingUp, FileText, PieChart } from 'lucide-react';

export const ReportsManager: React.FC = () => {
  const [reportType, setReportType] = useState('project-progress');
  const [dateRange, setDateRange] = useState('last-30-days');

  const reportTypes = [
    { id: 'project-progress', name: 'Proje İlerleme Raporu', icon: TrendingUp },
    { id: 'budget-analysis', name: 'Bütçe Analizi', icon: PieChart },
    { id: 'quality-metrics', name: 'Kalite Metrikleri', icon: BarChart3 },
    { id: 'team-performance', name: 'Ekip Performansı', icon: FileText }
  ];

  const mockReportData = {
    'project-progress': {
      title: 'Proje İlerleme Raporu',
      data: [
        { project: 'BMW X5 Fren Sistemi', progress: 45, status: 'Tasarım', deadline: '2024-08-30' },
        { project: 'Mercedes Sprinter Kaporta', progress: 68, status: 'Prototip', deadline: '2024-10-15' }
      ]
    },
    'budget-analysis': {
      title: 'Bütçe Analizi Raporu',
      data: [
        { category: 'Mühendislik', budgeted: 250000, spent: 112500, variance: -137500 },
        { category: 'Malzeme', budgeted: 400000, spent: 180000, variance: -220000 },
        { category: 'Kalite', budgeted: 150000, spent: 67500, variance: -82500 }
      ]
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

  const generateReport = () => {
    // Simulate report generation
    console.log(`Generating ${reportType} report for ${dateRange}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Raporlama & Analiz
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Proje performansı ve analiz raporları
          </p>
        </div>
        
        <button 
          onClick={generateReport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4 mr-2" />
          Rapor İndir
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aktif Proje</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">%87</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ortalama İlerleme</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <PieChart className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₺2.1M</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Bütçe</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">45</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tamamlanan Görev</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rapor Tipi
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tarih Aralığı
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="last-7-days">Son 7 Gün</option>
              <option value="last-30-days">Son 30 Gün</option>
              <option value="last-3-months">Son 3 Ay</option>
              <option value="last-6-months">Son 6 Ay</option>
              <option value="last-year">Son 1 Yıl</option>
            </select>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          {reportType === 'project-progress' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Proje İlerleme Özeti
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Proje
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        İlerleme
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Durum
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Teslim Tarihi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockReportData['project-progress'].data.map((project, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {project.project}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-900 dark:text-white">
                              %{project.progress}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {project.status}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {new Date(project.deadline).toLocaleDateString('tr-TR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {reportType === 'budget-analysis' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Bütçe Analizi
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Kategori
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Bütçe
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Harcanan
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        Fark
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockReportData['budget-analysis'].data.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {item.category}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {formatCurrency(item.budgeted)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                          {formatCurrency(item.spent)}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`text-sm font-medium ${
                            item.variance < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {formatCurrency(Math.abs(item.variance))}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
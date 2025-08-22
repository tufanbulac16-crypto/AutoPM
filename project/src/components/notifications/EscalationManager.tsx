import React, { useState } from 'react';
import { Mail, Send, Clock, AlertTriangle, User, Calendar } from 'lucide-react';

interface EscalationRule {
  id: string;
  name: string;
  condition: 'overdue' | 'approaching' | 'no-update';
  threshold: number; // days
  recipients: string[];
  emailTemplate: string;
  active: boolean;
}

interface DelayedAction {
  id: string;
  title: string;
  projectName: string;
  assignee: string;
  dueDate: string;
  daysOverdue: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastUpdate: string;
}

export const EscalationManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'delayed' | 'history'>('delayed');
  
  const [escalationRules, setEscalationRules] = useState<EscalationRule[]>([
    {
      id: '1',
      name: 'Geciken Kritik Görevler',
      condition: 'overdue',
      threshold: 1,
      recipients: ['manager@company.com', 'quality@company.com'],
      emailTemplate: 'Kritik görev gecikti: {task_name} - Sorumlu: {assignee}',
      active: true
    },
    {
      id: '2',
      name: 'Yaklaşan Teslim Tarihleri',
      condition: 'approaching',
      threshold: 3,
      recipients: ['team@company.com'],
      emailTemplate: 'Teslim tarihi yaklaşıyor: {task_name} - {days_left} gün kaldı',
      active: true
    }
  ]);

  const [delayedActions, setDelayedActions] = useState<DelayedAction[]>([
    {
      id: '1',
      title: 'CAD Tasarım Tamamlama',
      projectName: 'BMW X5 Fren Sistemi',
      assignee: 'Elif Demir',
      dueDate: '2024-03-15',
      daysOverdue: 5,
      priority: 'critical',
      lastUpdate: '2024-03-10'
    },
    {
      id: '2',
      title: 'PPAP Dokümanları Hazırlama',
      projectName: 'Mercedes Sprinter Kaporta',
      assignee: 'Mehmet Öz',
      dueDate: '2024-03-20',
      daysOverdue: 2,
      priority: 'high',
      lastUpdate: '2024-03-18'
    }
  ]);

  const [escalationHistory] = useState([
    {
      id: '1',
      taskName: 'CAD Tasarım Tamamlama',
      escalatedTo: 'manager@company.com',
      escalatedAt: '2024-03-20T10:30:00Z',
      reason: 'Görev 5 gün gecikmiş',
      status: 'sent'
    },
    {
      id: '2',
      taskName: 'PPAP Dokümanları',
      escalatedTo: 'quality@company.com',
      escalatedAt: '2024-03-19T14:15:00Z',
      reason: 'Görev 2 gün gecikmiş',
      status: 'sent'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      case 'high': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
    }
  };

  const sendEscalation = (actionId: string) => {
    const action = delayedActions.find(a => a.id === actionId);
    if (!action) return;

    // Simulate sending email
    const emailContent = `
Konu: Geciken Görev Eskalasyonu - ${action.title}

Merhaba,

Aşağıdaki görev belirlenen sürede tamamlanmamıştır:

Görev: ${action.title}
Proje: ${action.projectName}
Sorumlu: ${action.assignee}
Teslim Tarihi: ${new Date(action.dueDate).toLocaleDateString('tr-TR')}
Gecikme: ${action.daysOverdue} gün

Lütfen durumu kontrol ediniz ve gerekli aksiyonu alınız.

Saygılarımla,
Proje Yönetim Sistemi
    `;

    // Here you would integrate with actual email service
    console.log('Escalation email sent:', emailContent);
    
    // Show success message
    alert('Eskalasyon e-postası gönderildi!');
  };

  const generateOutlookIntegration = () => {
    const outlookUrl = `https://outlook.office.com/mail/deeplink/compose?subject=Geciken Görevler Raporu&body=${encodeURIComponent(
      'Geciken görevler listesi:\n\n' + 
      delayedActions.map(action => 
        `• ${action.title} (${action.daysOverdue} gün gecikmiş) - ${action.assignee}`
      ).join('\n')
    )}`;
    
    window.open(outlookUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Eskalasyon Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Geciken görevler ve otomatik bildirim sistemi
          </p>
        </div>
        
        <button
          onClick={generateOutlookIntegration}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Mail className="h-4 w-4 mr-2" />
          Outlook'ta Aç
        </button>
      </div>

      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('delayed')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'delayed'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Geciken Görevler ({delayedActions.length})
        </button>
        <button
          onClick={() => setActiveTab('rules')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'rules'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Eskalasyon Kuralları
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Geçmiş
        </button>
      </div>

      {activeTab === 'delayed' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {delayedActions.filter(a => a.priority === 'critical').length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Kritik Gecikme</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {delayedActions.reduce((sum, a) => sum + a.daysOverdue, 0)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Gecikme (Gün)</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <User className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {new Set(delayedActions.map(a => a.assignee)).size}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Etkilenen Kişi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Görev
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Sorumlu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Öncelik
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Gecikme
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Son Güncelleme
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      İşlem
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {delayedActions.map((action) => (
                    <tr key={action.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {action.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {action.projectName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {action.assignee}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(action.priority)}`}>
                          {action.priority === 'critical' ? 'Kritik' :
                           action.priority === 'high' ? 'Yüksek' :
                           action.priority === 'medium' ? 'Orta' : 'Düşük'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">
                            {action.daysOverdue} gün
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(action.lastUpdate).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => sendEscalation(action.id)}
                          className="flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Eskale Et
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Eskalasyon Kuralları
          </h3>
          
          <div className="space-y-4">
            {escalationRules.map((rule) => (
              <div key={rule.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {rule.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rule.condition === 'overdue' ? 'Görev geciktiğinde' :
                       rule.condition === 'approaching' ? 'Teslim tarihi yaklaştığında' :
                       'Güncelleme yapılmadığında'} - {rule.threshold} gün
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.active}
                      onChange={(e) => {
                        setEscalationRules(escalationRules.map(r => 
                          r.id === rule.id ? { ...r, active: e.target.checked } : r
                        ));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <strong>Alıcılar:</strong> {rule.recipients.join(', ')}
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>E-posta Şablonu:</strong> {rule.emailTemplate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Görev
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Alıcı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Sebep
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {escalationHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {item.taskName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {item.escalatedTo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(item.escalatedAt).toLocaleDateString('tr-TR')} {new Date(item.escalatedAt).toLocaleTimeString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.reason}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Gönderildi
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
  );
};
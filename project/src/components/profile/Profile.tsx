import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Save, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    personal: {
      name: 'Admin User',
      email: 'admin@company.com',
      phone: '+90 532 123 45 67',
      position: 'Proje Yöneticisi',
      department: 'Mühendislik',
      location: 'İstanbul, Türkiye',
      joinDate: '2023-01-15',
      avatar: ''
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      deadlineReminders: true,
      taskAssignments: true,
      budgetAlerts: true,
      qualityAlerts: true,
      inventoryAlerts: false
    },
    preferences: {
      theme: 'system',
      language: 'tr',
      dateFormat: 'dd/mm/yyyy',
      currency: 'TRY',
      timezone: 'Europe/Istanbul'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginNotifications: true
    }
  });

  const tabs = [
    { id: 'profile', name: 'Kişisel Bilgiler', icon: User },
    { id: 'notifications', name: 'Bildirimler', icon: Bell },
    { id: 'preferences', name: 'Tercihler', icon: Palette },
    { id: 'security', name: 'Güvenlik', icon: Shield }
  ];

  const handleSave = () => {
    console.log('Profile saved:', profile);
    alert('Profil bilgileri kaydedildi!');
  };

  const updateProfile = (category: string, key: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Profil
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kişisel bilgiler ve uygulama ayarları
          </p>
        </div>
        
        <button
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Kaydet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {profile.personal.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {profile.personal.position}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                {profile.personal.department}
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Kişisel Bilgiler
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      value={profile.personal.name}
                      onChange={(e) => updateProfile('personal', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      E-posta
                    </label>
                    <input
                      type="email"
                      value={profile.personal.email}
                      onChange={(e) => updateProfile('personal', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={profile.personal.phone}
                      onChange={(e) => updateProfile('personal', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pozisyon
                    </label>
                    <select
                      value={profile.personal.position}
                      onChange={(e) => updateProfile('personal', 'position', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Proje Yöneticisi">Proje Yöneticisi</option>
                      <option value="Mühendis">Mühendis</option>
                      <option value="Kalite Uzmanı">Kalite Uzmanı</option>
                      <option value="Lojistik Uzmanı">Lojistik Uzmanı</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Departman
                    </label>
                    <select
                      value={profile.personal.department}
                      onChange={(e) => updateProfile('personal', 'department', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Mühendislik">Mühendislik</option>
                      <option value="Kalite">Kalite</option>
                      <option value="Lojistik">Lojistik</option>
                      <option value="Satış">Satış</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Lokasyon
                    </label>
                    <input
                      type="text"
                      value={profile.personal.location}
                      onChange={(e) => updateProfile('personal', 'location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    Katılım Tarihi: {new Date(profile.personal.joinDate).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Bildirim Ayarları
                </h2>
                
                <div className="space-y-4">
                  {Object.entries(profile.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {key === 'emailNotifications' && 'E-posta Bildirimleri'}
                          {key === 'pushNotifications' && 'Anlık Bildirimler'}
                          {key === 'deadlineReminders' && 'Teslim Tarihi Hatırlatmaları'}
                          {key === 'taskAssignments' && 'Görev Atamaları'}
                          {key === 'budgetAlerts' && 'Bütçe Uyarıları'}
                          {key === 'qualityAlerts' && 'Kalite Uyarıları'}
                          {key === 'inventoryAlerts' && 'Envanter Uyarıları'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {key === 'emailNotifications' && 'E-posta ile bildirim alın'}
                          {key === 'pushNotifications' && 'Tarayıcı bildirimleri'}
                          {key === 'deadlineReminders' && 'Yaklaşan teslim tarihleri için uyarı'}
                          {key === 'taskAssignments' && 'Yeni görev atandığında bildirim'}
                          {key === 'budgetAlerts' && 'Bütçe aşımı durumunda uyarı'}
                          {key === 'qualityAlerts' && 'Kalite sorunları için uyarı'}
                          {key === 'inventoryAlerts' && 'Stok durumu uyarıları'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value as boolean}
                          onChange={(e) => updateProfile('notifications', key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Uygulama Tercihleri
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tema
                    </label>
                    <select
                      value={profile.preferences.theme}
                      onChange={(e) => updateProfile('preferences', 'theme', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="light">Açık</option>
                      <option value="dark">Koyu</option>
                      <option value="system">Sistem</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Dil
                    </label>
                    <select
                      value={profile.preferences.language}
                      onChange={(e) => updateProfile('preferences', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="tr">Türkçe</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tarih Formatı
                    </label>
                    <select
                      value={profile.preferences.dateFormat}
                      onChange={(e) => updateProfile('preferences', 'dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                      <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                      <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Para Birimi
                    </label>
                    <select
                      value={profile.preferences.currency}
                      onChange={(e) => updateProfile('preferences', 'currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="TRY">Türk Lirası (₺)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Saat Dilimi
                    </label>
                    <select
                      value={profile.preferences.timezone}
                      onChange={(e) => updateProfile('preferences', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Europe/Istanbul">İstanbul (GMT+3)</option>
                      <option value="Europe/London">Londra (GMT+0)</option>
                      <option value="America/New_York">New York (GMT-5)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Güvenlik Ayarları
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        İki Faktörlü Kimlik Doğrulama
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Hesabınız için ek güvenlik katmanı
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.security.twoFactorAuth}
                        onChange={(e) => updateProfile('security', 'twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Giriş Bildirimleri
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Hesabınıza giriş yapıldığında bildirim alın
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.security.loginNotifications}
                        onChange={(e) => updateProfile('security', 'loginNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Oturum Zaman Aşımı (dakika)
                      </label>
                      <input
                        type="number"
                        value={profile.security.sessionTimeout}
                        onChange={(e) => updateProfile('security', 'sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        min="5"
                        max="480"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Şifre Geçerlilik Süresi (gün)
                      </label>
                      <input
                        type="number"
                        value={profile.security.passwordExpiry}
                        onChange={(e) => updateProfile('security', 'passwordExpiry', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        min="30"
                        max="365"
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <button className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Şifre Değiştir
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
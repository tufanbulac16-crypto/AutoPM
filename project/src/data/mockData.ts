import { Project, Task } from '../types/project';
import type { Budget, QualityRecord, InventoryItem, Document } from '../types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'BMW X5 Fren Sistemi',
    customer: 'BMW Group',
    startDate: '2024-01-15',
    endDate: '2024-08-30',
    status: 'design',
    progress: 45,
    priority: 'high',
    phase: {
      current: 'design',
      phases: {
        concept: { name: 'Konsept', completed: true, dueDate: '2024-02-01' },
        design: { name: 'Tasarım', completed: false, dueDate: '2024-04-15' },
        proto: { name: 'Prototip', completed: false, dueDate: '2024-06-01' },
        validation: { name: 'Doğrulama', completed: false, dueDate: '2024-07-15' },
        sop: { name: 'SOP', completed: false, dueDate: '2024-08-30' },
      }
    },
    team: [
      { id: '1', name: 'Ahmet Kaya', role: 'project-manager', email: 'ahmet.kaya@company.com' },
      { id: '2', name: 'Elif Demir', role: 'engineer', email: 'elif.demir@company.com' },
      { id: '3', name: 'Mehmet Öz', role: 'quality', email: 'mehmet.oz@company.com' }
    ]
  },
  {
    id: '2',
    name: 'Mercedes Sprinter Kaporta',
    customer: 'Mercedes-Benz',
    startDate: '2024-02-01',
    endDate: '2024-10-15',
    status: 'proto',
    progress: 68,
    priority: 'critical',
    phase: {
      current: 'proto',
      phases: {
        concept: { name: 'Konsept', completed: true, dueDate: '2024-02-15' },
        design: { name: 'Tasarım', completed: true, dueDate: '2024-04-01' },
        proto: { name: 'Prototip', completed: false, dueDate: '2024-07-01' },
        validation: { name: 'Doğrulama', completed: false, dueDate: '2024-09-01' },
        sop: { name: 'SOP', completed: false, dueDate: '2024-10-15' },
      }
    },
    team: [
      { id: '4', name: 'Fatma Şen', role: 'project-manager', email: 'fatma.sen@company.com' },
      { id: '5', name: 'Ali Yılmaz', role: 'engineer', email: 'ali.yilmaz@company.com' }
    ]
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'CAD Tasarım Tamamlama',
    description: 'Fren kaliperi için CAD tasarımının tamamlanması',
    projectId: '1',
    assignedTo: 'Elif Demir',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-03-15',
    createdDate: '2024-02-01',
    department: 'Mühendislik',
    comments: [
      {
        id: '1',
        author: 'Ahmet Kaya',
        content: 'Müşteri gereksinimlerine göre revizyon yapılması gerekiyor.',
        timestamp: '2024-02-10T10:30:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'PPAP Dokümanları Hazırlama',
    description: 'Üretim parçası onay süreci dokümanlarının hazırlanması',
    projectId: '2',
    assignedTo: 'Mehmet Öz',
    status: 'review',
    priority: 'critical',
    dueDate: '2024-03-20',
    createdDate: '2024-02-05',
    department: 'Kalite'
  },
  {
    id: '3',
    title: 'Malzeme Tedarik Planlaması',
    description: 'Prototip üretimi için malzeme tedarik planının oluşturulması',
    projectId: '1',
    assignedTo: 'Ali Yılmaz',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-03-25',
    createdDate: '2024-02-08',
    department: 'Lojistik'
  }
];

export const dashboardStats = {
  totalProjects: 12,
  activeProjects: 8,
  completedProjects: 4,
  criticalTasks: 3,
  upcomingDeadlines: 5
};

export const mockBudgets: Budget[] = [
  {
    id: '1',
    projectId: '1',
    totalBudget: 850000,
    spentAmount: 382500,
    currency: 'TRY',
    lastUpdated: '2024-03-10',
    categories: [
      {
        id: '1',
        name: 'Mühendislik',
        budgetedAmount: 250000,
        spentAmount: 112500,
        subcategories: [
          { id: '1', name: 'Tasarım', budgetedAmount: 150000, spentAmount: 67500 },
          { id: '2', name: 'İşçilik', budgetedAmount: 80000, spentAmount: 36000 },
          { id: '3', name: 'Danışmanlık', budgetedAmount: 20000, spentAmount: 9000 }
        ]
      },
      {
        id: '2',
        name: 'Malzeme',
        budgetedAmount: 400000,
        spentAmount: 180000,
        subcategories: [
          { id: '4', name: 'Proto Parçalar', budgetedAmount: 150000, spentAmount: 67500 },
          { id: '5', name: 'Seri Parçalar', budgetedAmount: 200000, spentAmount: 90000 },
          { id: '6', name: 'Kalıplar', budgetedAmount: 50000, spentAmount: 22500 }
        ]
      },
      {
        id: '3',
        name: 'Kalite',
        budgetedAmount: 150000,
        spentAmount: 67500,
        subcategories: [
          { id: '7', name: 'Testler', budgetedAmount: 80000, spentAmount: 36000 },
          { id: '8', name: 'Ölçüm Cihazları', budgetedAmount: 50000, spentAmount: 22500 },
          { id: '9', name: 'Raporlama', budgetedAmount: 20000, spentAmount: 9000 }
        ]
      },
      {
        id: '4',
        name: 'Diğer Giderler',
        budgetedAmount: 50000,
        spentAmount: 22500,
        subcategories: [
          { id: '10', name: 'Lisans', budgetedAmount: 20000, spentAmount: 9000 },
          { id: '11', name: 'Yazılım', budgetedAmount: 20000, spentAmount: 9000 },
          { id: '12', name: 'Eğitim', budgetedAmount: 10000, spentAmount: 4500 }
        ]
      }
    ]
  }
];

export const mockQualityRecords: QualityRecord[] = [
  {
    id: '1',
    projectId: '1',
    type: 'ppap',
    title: 'PPAP Seviye 3 Onayı',
    status: 'in-review',
    createdDate: '2024-02-15',
    dueDate: '2024-03-20',
    assignedTo: 'Mehmet Öz',
    files: ['ppap_report.pdf', 'measurement_data.xlsx'],
    description: 'BMW X5 fren kaliperi için PPAP dokümanları hazırlandı'
  },
  {
    id: '2',
    projectId: '2',
    type: 'cmm',
    title: 'CMM Ölçüm Raporu',
    status: 'approved',
    createdDate: '2024-02-20',
    dueDate: '2024-03-01',
    assignedTo: 'Fatma Şen',
    files: ['cmm_report.pdf'],
    description: 'Mercedes Sprinter kaporta parçası ölçüm sonuçları'
  }
];

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    partNumber: 'BMW-FK-001',
    partName: 'Fren Kaliperi Gövdesi',
    category: 'proto',
    quantity: 15,
    unit: 'adet',
    supplier: 'ABC Döküm',
    status: 'in-stock',
    lastUpdated: '2024-03-10'
  },
  {
    id: '2',
    partNumber: 'MB-KP-002',
    partName: 'Kaporta Paneli',
    category: 'serial',
    quantity: 3,
    unit: 'adet',
    supplier: 'XYZ Metal',
    status: 'low-stock',
    lastUpdated: '2024-03-09'
  }
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'BMW_X5_Brake_Caliper_Drawing.dwg',
    type: 'drawing',
    version: 'V2.1',
    projectId: '1',
    uploadedBy: 'Elif Demir',
    uploadDate: '2024-02-28',
    size: '2.4 MB',
    accessLevel: 'internal'
  },
  {
    id: '2',
    name: 'Mercedes_Sprinter_CAD_Model.step',
    type: 'cad',
    version: 'V1.3',
    projectId: '2',
    uploadedBy: 'Ali Yılmaz',
    uploadDate: '2024-03-05',
    size: '15.7 MB',
    accessLevel: 'restricted'
  }
];
export interface Project {
  id: string;
  name: string;
  customer: string;
  startDate: string;
  endDate: string;
  status: 'concept' | 'design' | 'proto' | 'validation' | 'sop' | 'after-sales';
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  team: ProjectMember[];
  phase: APQPPhase;
}

export interface ProjectMember {
  id: string;
  name: string;
  role: 'engineer' | 'quality' | 'logistics' | 'customer-rep' | 'project-manager';
  email: string;
}

export interface APQPPhase {
  current: string;
  phases: {
    [key: string]: {
      name: string;
      completed: boolean;
      dueDate: string;
    };
  };
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  createdDate: string;
  department: string;
  files?: string[];
  comments?: TaskComment[];
}

export interface TaskComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export interface Budget {
  id: string;
  projectId: string;
  totalBudget: number;
  spentAmount: number;
  categories: BudgetCategory[];
  currency: string;
  lastUpdated: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgetedAmount: number;
  spentAmount: number;
  subcategories: BudgetSubcategory[];
}

export interface BudgetSubcategory {
  id: string;
  name: string;
  budgetedAmount: number;
  spentAmount: number;
  description?: string;
}

export interface QualityRecord {
  id: string;
  projectId: string;
  type: 'ppap' | 'cmm' | 'fai' | '8d' | 'non-conformance';
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  createdDate: string;
  dueDate: string;
  assignedTo: string;
  files: string[];
  description: string;
}

export interface InventoryItem {
  id: string;
  partNumber: string;
  partName: string;
  category: 'proto' | 'serial' | 'test' | 'tooling';
  quantity: number;
  unit: string;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'ordered';
  lastUpdated: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'cad' | 'drawing' | 'report' | 'specification' | 'other';
  version: string;
  projectId: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  accessLevel: 'public' | 'internal' | 'restricted';
}

export interface ChangeRequest {
  id: string;
  projectId: string;
  title: string;
  description: string;
  requestedBy: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
  priority: 'low' | 'medium' | 'high' | 'critical';
  impactAssessment: {
    cost: number;
    timeline: number; // days
    scope: string;
  };
  approvedBy?: string;
  approvalDate?: string;
  implementationDate?: string;
  comments: ChangeRequestComment[];
}

export interface ChangeRequestComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}
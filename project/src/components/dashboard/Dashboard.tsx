import React from 'react';
import { 
  FolderOpen, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp,
  DollarSign,
  Target
} from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { ProjectProgress } from './ProjectProgress';
import { UpcomingDeadlines } from './UpcomingDeadlines';
import { BudgetOverview } from './BudgetOverview';
import { ProjectStatusChart } from './ProjectStatusChart';
import { TaskDistributionChart } from './TaskDistributionChart';
import { dashboardStats } from '../../data/mockData';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Projelere genel bakış ve önemli metriklerin özeti
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Toplam Proje"
          value={dashboardStats.totalProjects}
          icon={FolderOpen}
          color="blue"
        />
        <StatCard
          title="Aktif Proje"
          value={dashboardStats.activeProjects}
          icon={TrendingUp}
          color="purple"
        />
        <StatCard
          title="Tamamlanan"
          value={dashboardStats.completedProjects}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Kritik Görev"
          value={dashboardStats.criticalTasks}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Yaklaşan Teslim"
          value={dashboardStats.upcomingDeadlines}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Toplam Bütçe"
          value="₺850K"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Bütçe Kullanımı"
          value="%45"
          icon={Target}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ProjectStatusChart />
        <TaskDistributionChart />
        <BudgetOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectProgress />
        <UpcomingDeadlines />
      </div>
    </div>
  );
};
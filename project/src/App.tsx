import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProjectList } from './components/projects/ProjectList';
import { TaskManager } from './components/tasks/TaskManager';
import { Timeline } from './components/timeline/Timeline';
import { QualityManager } from './components/quality/QualityManager';
import { EquipmentManager } from './components/inventory/EquipmentManager';
import { DocumentManager } from './components/documents/DocumentManager';
import { BudgetManager } from './components/budget/BudgetManager';
import { ReportsManager } from './components/reports/ReportsManager';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { Profile } from './components/profile/Profile';
import { GanttChart } from './components/timeline/GanttChart';
import { ProjectSummary } from './components/dashboard/ProjectSummary';
import { EscalationManager } from './components/notifications/EscalationManager';
import { ChangeRequestManager } from './components/projects/ChangeRequestManager';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardView, setDashboardView] = useState('overview');
  const [projectsView, setProjectsView] = useState('list');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return dashboardView === 'overview' ? <Dashboard /> : <ProjectSummary />;
      case 'projects':
        return projectsView === 'list' ? <ProjectList /> : <ChangeRequestManager />;
      case 'tasks':
        return <TaskManager />;
      case 'timeline':
        return <GanttChart />;
      case 'quality':
        return <QualityManager />;
      case 'inventory':
        return <EquipmentManager />;
      case 'documents':
        return <DocumentManager />;
      case 'budget':
        return <BudgetManager />;
      case 'reports':
        return <ReportsManager />;
      case 'notifications':
        return activeTab === 'notifications' && dashboardView === 'escalation' ? <EscalationManager /> : <NotificationCenter />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            dashboardView={dashboardView} 
            setDashboardView={setDashboardView}
            activeTab={activeTab}
            projectsView={projectsView}
            setProjectsView={setProjectsView}
          />
          <main className="flex-1 overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
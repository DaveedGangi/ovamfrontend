import React from 'react';
import DashboardContent from './Sections/DashboardContent';
import Repositories from './Sections/Repositories'; // more as needed...
import Integration from './Sections/Integrations';
import Reports from './Sections/Reports';

const MainContent = ({ activeSection, sidebarCollapsed }) => {
  const sectionComponents = {
    dashboard: <DashboardContent />,
    repositories: <Repositories />,
    integrations:<Integration/>,
    reports:<Reports/>
    // Add other components similarly
  };

  return (
    <div className={`main-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {sectionComponents[activeSection] || <div className="main-content"><p>Section not found.</p></div>}
    </div>
  );
};

export default MainContent;

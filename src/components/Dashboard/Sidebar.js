import React, { useState } from 'react';
import { 
  ChevronDown, 
  FolderOpen,
  BarChart3,
  Puzzle,
  FileText,
  GraduationCap,
  Settings,
  Wrench,
  Key,
  CreditCard,
  Gift,
  BookOpen,
  HelpCircle,
  Github,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ user, activeSection, setActiveSection, collapsed, setCollapsed, onLogout }) => {
  const [settingsExpanded, setSettingsExpanded] = useState(false);
 

  const menuItems = [
    { id: 'repositories', label: 'Repositories', icon: FolderOpen },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'learnings', label: 'Learnings', icon: GraduationCap },
  ];

  const settingsItems = [
    { id: 'configuration', label: 'Configuration', icon: Wrench },
    { id: 'api-keys', label: 'API Keys', icon: Key },
  ];

  const bottomItems = [
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'refer-earn', label: 'Refer and Earn', icon: Gift },
    { id: 'docs', label: 'Docs', icon: BookOpen },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* User Profile */}
      <div className="sidebar-header">
        <div className="user-profile">
          <Github size={20} />
          <div className="user-info">
            <div className="username">{user}</div>
            <div className="user-role">Organization</div>
          </div>
          <ChevronDown size={16} className="dropdown-icon" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Organization Settings */}
        <div className="settings-section">
          <button
            onClick={() => setSettingsExpanded(!settingsExpanded)}
            className="settings-toggle"
          >
            <Settings size={18} />
            <span>Organization Settings</span>
            <ChevronRight size={16} className={`chevron ${settingsExpanded ? 'expanded' : ''}`} />
          </button>
          
          {settingsExpanded && (
            <ul className="settings-submenu">
              {settingsItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    >
                      <IconComponent size={16} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Bottom Navigation */}
        <ul className="bottom-nav">
          {bottomItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Footer */}
      <div className="sidebar-footer">
        <div className="user-avatar">
          <span>{user.toUpperCase()[0]}</span>
        </div>
        <div className="user-details">
          <div className="footer-username">{user}</div>
          <div className="footer-role">role</div>
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
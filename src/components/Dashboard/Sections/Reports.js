import React, { useState } from 'react';
import './reports.css';

const Reports = () => {
  const [createAllKey, setCreateAllKey] = useState(false);

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Reports Dashboard</h1>
        <p>Create and manage your data visualization projects</p>
      </div>
      
      <div className="reports-content">
        <div className="create-project">
          <div className="project-card">
            <div className="card-header">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#3b82f6" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-2h4v2zm0-4H7v-2h4v2zm0-4H7V7h4v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z"/>
                </svg>
              </div>
              <h2>Create Your First Project</h2>
              <p>Let's tell your data story together. Visualize insights and share reports with your team.</p>
            </div>
            
            <div className="card-features">
              <div className="feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Interactive Dashboards</h4>
                  <p>Create dynamic visualizations with real-time data</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Collaborative Reports</h4>
                  <p>Share insights and collaborate with your team</p>
                </div>
              </div>
              
              <div className="feature">
                <div className="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div className="feature-text">
                  <h4>Custom Templates</h4>
                  <p>Start with professionally designed templates</p>
                </div>
              </div>
            </div>
            
            <div className="create-key">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={createAllKey}
                  onChange={() => setCreateAllKey(!createAllKey)}
                />
                <span className="checkmark"></span>
                <span className="label-text">Create all API keys automatically</span>
              </label>
              <div className="info-tooltip">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#64748b" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                </svg>
                <div className="tooltip-text">Automatically generate all required API keys for your project</div>
              </div>
            </div>
            
            <button className="create-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Create Project
            </button>
          </div>
        </div>
        
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon" style={{backgroundColor: 'rgba(59, 130, 246, 0.1)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#3b82f6" viewBox="0 0 24 24">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>24+</h3>
              <p>Report Templates</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{backgroundColor: 'rgba(16, 185, 129, 0.1)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#10b981" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>5,000+</h3>
              <p>Active Users</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon" style={{backgroundColor: 'rgba(245, 158, 11, 0.1)'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#f59e0b" viewBox="0 0 24 24">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </div>
            <div className="stat-content">
              <h3>98%</h3>
              <p>Positive Feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
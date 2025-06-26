import React, { useState } from 'react';
import './integration.css';

const Integration = () => {
  const [integrations, setIntegrations] = useState({
    jira: { enabled: false, name: 'Jira' },
    linear: { enabled: false, name: 'Linear' },
    circleci: { enabled: false, name: 'CircleCI' }
  });

  const toggleIntegration = (service) => {
    setIntegrations(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        enabled: !prev[service].enabled
      }
    }));
  };

  const integrationData = [
    {
      id: 'jira',
      title: 'Jira',
      description: 'Plan, track, and release great software.',
      note: 'Using Jira Data Center (Self-Hosted)?'
    },
    {
      id: 'linear',
      title: 'Linear',
      description: 'Streamline software projects, sprints, and bug tracking.'
    },
    {
      id: 'circleci',
      title: 'CircleCI',
      description: 'Continuous Integration and Delivery Platform. Connect your CircleCI builds for enhanced PR analysis.'
    }
  ];

  return (
    <div className="integrations-section">
      <h2>Installations</h2>
      <p className="subtext">
        If you use one of these services, we recommend integrating them with CodeRabbit. 
        This will allow CodeRabbit to use the content from the linked issues while reviewing the code. 
        New workflow integrations are in progress and will be added upon availability.
      </p>

      <div className="integration-grid">
        {integrationData.map((item) => (
          <div className="integration-card" key={item.id}>
            <div className="card-header">
              <h3>{item.title}</h3>
              <label className="toggle-switch">
                <input 
                  type="checkbox"
                  checked={integrations[item.id].enabled}
                  onChange={() => toggleIntegration(item.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
            
            <p className="description">{item.description}</p>
            
            {item.note && <p className="note">{item.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Integration;
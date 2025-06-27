

import React, { useState, useEffect } from 'react';
import { Clock, Search, RotateCcw } from 'lucide-react';
import './dashboardcontent.css';

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState('adoption');
  const [timeFilter, setTimeFilter] = useState('Last 30 days');
  const [repositoryFilter, setRepositoryFilter] = useState('All');
  const [repositories, setRepositories] = useState([]);
  const [usernameFilter] = useState('All');
  const [teamFilter] = useState('All');

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = localStorage.getItem('oauthProvider');
  const token = localStorage.getItem('oauthToken');

  useEffect(() => {
    const fetchStats = async () => {
      if (!token || !provider) return;

      try {
        let allRepos = [];

        if (provider === 'github') {
          const res = await fetch('https://api.github.com/user/repos?per_page=100', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
          allRepos = await res.json();

          const totalStars = allRepos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
          const totalForks = allRepos.reduce((acc, r) => acc + (r.forks_count || 0), 0);
          const repoNames = allRepos.map(r => r.name);

          setRepositories(repoNames);

          setStats({
            totalRepos: allRepos.length,
            stars: totalStars,
            forks: totalForks,
            comments: 0,
            accepted: 0,
            learningsUsed: 0,
            learningsCreated: 0,
          });
        }

        // TODO: Add similar logic for GitLab, Azure, Bitbucket

      } catch (err) {
        console.error('❌ Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token, provider]);

  return (
    <div className="main-content">
      <div className="content-header">
        <h1>Dashboard {provider && `— ${provider.toUpperCase()}`}</h1>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          onClick={() => setActiveTab('adoption')}
          className={`tab ${activeTab === 'adoption' ? 'active' : ''}`}
        >
          Adoption
        </button>
        <button
          onClick={() => setActiveTab('suggestion')}
          className={`tab ${activeTab === 'suggestion' ? 'active' : ''}`}
        >
          Suggestion Breakdown
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Repository Name</label>
          <select value={repositoryFilter} onChange={(e) => setRepositoryFilter(e.target.value)}>
            <option value="All">All</option>
            {repositories.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Usernames</label>
          <select value={usernameFilter} disabled>
            <option>All</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Team</label>
          <select value={teamFilter} disabled>
            <option>All</option>
          </select>
        </div>

        <div className="filter-group time-filter">
          <Clock size={16} />
          <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
          <span className="timezone">UTC</span>
        </div>

        <div className="filter-actions">
          <button className="filter-button"><Search size={16} /></button>
          <button className="filter-button"><RotateCcw size={16} /></button>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <p>Loading stats...</p>
      ) : stats ? (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Repos</h3>
            <span className="value-number">{stats.totalRepos}</span>
          </div>
          <div className="stat-card">
            <h3>⭐ Stars</h3>
            <span className="value-number">{stats.stars}</span>
          </div>
          <div className="stat-card">
            <h3>🍴 Forks</h3>
            <span className="value-number">{stats.forks}</span>
          </div>
          <div className="stat-card">
            <h3>Review Comments</h3>
            <span className="value-number">{stats.comments}</span>
          </div>
          <div className="stat-card">
            <h3>Suggestions Accepted</h3>
            <span className="value-number">{stats.accepted}</span>
          </div>
          <div className="stat-card">
            <h3>Learnings Used</h3>
            <span className="value-number">{stats.learningsUsed}</span>
          </div>
          <div className="stat-card">
            <h3>Learnings Created</h3>
            <span className="value-number">{stats.learningsCreated}</span>
          </div>
        </div>
      ) : (
        <p>No stats available.</p>
      )}

      {/* Leaderboard */}
      <div className="leaderboard">
        <h2>Developer Adoption Leaderboard</h2>
        <div className="no-data"><p>No data</p></div>
      </div>
    </div>
  );
};

export default DashboardContent;
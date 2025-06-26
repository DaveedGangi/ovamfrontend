import React, { useState, useEffect } from 'react';
import './repositories.css';

const Repository = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const accessToken = localStorage.getItem("oauthToken");
    const provider = localStorage.getItem("oauthProvider");

    const fetchRepos = async () => {
      if (!accessToken || !provider) return;

      let url = "";
      let headers = {
        Authorization: `Bearer ${accessToken}`
      };

      switch (provider) {
        case "github":
          url = "https://api.github.com/user/repos";
          headers.Accept = "application/vnd.github+json";
          break;
        case "gitlab":
          url = "https://gitlab.com/api/v4/projects?membership=true";
          break;
        case "bitbucket":
          url = "https://api.bitbucket.org/2.0/repositories?role=member";
          break;
        case "azure":
          url = "https://dev.azure.com/YOUR_ORG/_apis/projects?api-version=6.0";
          break;
        default:
          console.warn("Unsupported provider:", provider);
          return;
      }

      try {
        const res = await fetch(url, { headers });
        const data = await res.json();

        let repos = [];

        if (provider === "github") {
          repos = data.map(repo => ({
            name: repo.name,
            public: !repo.private
          }));
        } else if (provider === "gitlab") {
          repos = data.map(repo => ({
            name: repo.name,
            public: repo.visibility === "public"
          }));
        } else if (provider === "bitbucket") {
          repos = (data.values || []).map(repo => ({
            name: repo.name,
            public: !repo.is_private
          }));
        }

        setRepositories(repos);
      } catch (error) {
        console.error("❌ Failed to fetch repositories:", error);
      }
    };

    fetchRepos();
  }, []);

  // Reset page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Apply filter first, then paginate
  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRepos.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="repository-container">
      <div className="header">
        <h1>Repositories</h1>
        <p>List of repositories accessible to your account.</p>
      </div>

      <div className="repository-content">
        <div className="repo-header">
          <div className="section-title">
            <h2>REPOSITORY</h2>
            <div className="status-indicator"></div>
          </div>
          <button className="add-repo-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
            Add Repositories
          </button>
        </div>

        <div className="search-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#94a3b8" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Repo not found? Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="repo-list">
          {paginatedRepos.length > 0 ? (
            paginatedRepos.map((repo, index) => (
              <div key={index} className="repo-item">
                <div className="repo-info">
                  <div className="repo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6a737d" viewBox="0 0 16 16">
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 1 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 0 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 0 1 1-1h8zM5 12.25v3.25a.25.25 0 0 0 .4.2l1.45-1.087a.25.25 0 0 1 .3 0L8.6 15.7a.25.25 0 0 0 .4-.2v-3.25a.25.25 0 0 0-.25-.25h-3.5a.25.25 0 0 0-.25.25z"/>
                    </svg>
                  </div>
                  <div className="repo-name">{repo.name}</div>
                </div>
                {repo.public && <div className="public-tag">Public</div>}
              </div>
            ))
          ) : (
            <div className="no-results">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#94a3b8" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
              </svg>
              <p>No repositories found</p>
            </div>
          )}
        </div>

        <div className="actions-section">
          <button className="action-btn">Add Repositories</button>
          <button className="action-btn">ACTIONS</button>
          <button className="action-btn">Generate Badge</button>
        </div>

        <div className="pagination">
          <div className="rows-per-page">
            <span>Rows per page</span>
            <div className="select-wrapper">
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
              <span className="dropdown-icon">▼</span>
            </div>
          </div>
          <div className="page-info">
            <span>Page {currentPage} of {totalPages}</span>
            <div className="page-controls">
              <button
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                &lt;
              </button>
              <button
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repository;

// Full Repository Component (Repository.js)
// Includes repo list, search, pagination, and repo selection.
// Clicking a repo shows RepoExplorer to view code and folders.

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import React, { useState, useEffect } from 'react';
import RepoExplorer from './RepoExplorer';
import './repositories.css';

const Repository = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const accessToken = localStorage.getItem("oauthToken");
  const provider = localStorage.getItem("oauthProvider");

  useEffect(() => {
    if (!accessToken || !provider) return;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const fetchRepos = async () => {
      let allRepos = [];
      toast.info('🔄 Fetching repositories...');

      try {
        if (provider === "github") {
          headers.Accept = "application/vnd.github+json";
          let page = 1;
          let hasNext = true;

          while (hasNext) {
            const res = await fetch(`https://api.github.com/user/repos?per_page=100&page=${page}`, { headers });
            const data = await res.json();
            if (!Array.isArray(data)) throw new Error("GitHub API error");

            allRepos = [...allRepos, ...data.map(repo => ({
              name: `${repo.owner.login}/${repo.name}`,
              public: !repo.private
            }))];

            hasNext = data.length === 100;
            page++;
          }
        }
        
        setRepositories(allRepos);
        toast.success(`✅ Loaded ${allRepos.length} repositories`);
      } catch (error) {
        console.error("❌ Failed to fetch repositories:", error);
        toast.error('❌ Failed to fetch repositories');
      }
    };

    fetchRepos();
  }, [accessToken, provider]);

  useEffect(() => setCurrentPage(1), [searchTerm]);

  const filteredRepos = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRepos.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRepos = filteredRepos.slice(startIndex, startIndex + rowsPerPage);

  if (selectedRepo) {
    return <RepoExplorer token={accessToken} repoName={selectedRepo} onBack={() => setSelectedRepo(null)} />;
  }

  return (
    <div className="repository-container">
      <div className="header">
        <h1>Repositories</h1>
        <input className="search-container"
          type="text"
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="repo-list">
        {paginatedRepos.map((repo, index) => (
          <div key={index} className="repo-item" onClick={() => setSelectedRepo(repo.name)}>
            <span role="img" aria-label="repo">
              📦</span>   <span className="repo-link">{repo.name}</span>
               <span className={repo.public ? "public-tag" : "private-tag"}>
              {repo.public ? "Public" : "Private"}
            </span>

          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>&lt;</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>&gt;</button>

        <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
        </select>
      </div>



      <ToastContainer
  position="top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="colored"
/>

    </div>
  );
};

export default Repository;

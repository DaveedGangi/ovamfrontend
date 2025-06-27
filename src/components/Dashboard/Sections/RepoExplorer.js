// src/components/Repository/RepoExplorer.js
import React, { useState, useEffect, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './repoexplorer.css';

const RepoExplorer = ({ token, repoName, onBack, provider = 'github' }) => {
  const [repoTree, setRepoTree] = useState([]);
  const [fileContent, setFileContent] = useState(null);
  const [pathStack, setPathStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pullsCount, setPullsCount] = useState({ open: 0, closed: 0 });
  const [latestPRDate, setLatestPRDate] = useState(null);

  const owner = repoName.split('/')[0];
  const repo = repoName.split('/')[1];

  const fetchRepoTree = useCallback(async (path = '') => {
    setLoading(true);
    setError(null);
    try {
      const branchRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const repoMeta = await branchRes.json();
      const branch = repoMeta.default_branch;

      const treeRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await treeRes.json();
      const filtered = data.tree.filter(item => item.path.startsWith(path));

      const directItems = filtered.filter(item => {
        const relativePath = item.path.slice(path.length ? path.length + 1 : 0);
        return (relativePath && !relativePath.includes('/')) || relativePath.split('/').length === 1;
      });

      setRepoTree(directItems);
    } catch (err) {
      console.error('Failed to load repo tree:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [owner, repo, token]);

  const fetchPullRequests = useCallback(async () => {
    if (provider !== 'github') return;
    try {
      const openRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=open&per_page=1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const closedRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=1`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const openData = await openRes.json();
      const closedData = await closedRes.json();

     // const openCount = Number(openRes.headers.get('Link')?.match(/&page=(\d+)>; rel="last"/)?[1]) || openData.length;
            const openLinkHeader = openRes.headers.get('Link');
            const openMatch = openLinkHeader && openLinkHeader.match(/&page=(\d+)>; rel="last"/);
            const openCount = Number(openMatch ? openMatch[1] : openData.length);

     
     
     //const closedCount = Number(closedRes.headers.get('Link')?.match(/&page=(\d+)>; rel="last"/)?[1]) || closedData.length;

     const closedLinkHeader = closedRes.headers.get('Link');
    const closedMatch = closedLinkHeader && closedLinkHeader.match(/&page=(\d+)>; rel="last"/);
    const closedCount = Number(closedMatch ? closedMatch[1] : closedData.length);

      setPullsCount({ open: openCount, closed: closedCount });

      if (Array.isArray(openData) && openData.length > 0) {
        setLatestPRDate(openData[0].created_at);
      }
    } catch (err) {
      console.error('Failed to fetch pull requests:', err);
    }
  }, [owner, repo, token, provider]);

  useEffect(() => {
    fetchRepoTree();
    fetchPullRequests();
  }, [fetchRepoTree, fetchPullRequests]);

  const fetchFileContent = async (path) => {
    setLoading(true);
    setFileContent(null);
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.content) {
        const decoded = atob(data.content);
        setFileContent({ name: data.name, content: decoded });
      } else {
        setError('No content found');
      }
    } catch (err) {
      setError('Failed to fetch file');
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    if (item.type === 'tree') {
      setPathStack(prev => [...prev, item.path]);
      fetchRepoTree(item.path);
      setFileContent(null);
    } else {
      fetchFileContent(item.path);
    }
  };

  const handleBack = () => {
    const newStack = [...pathStack];
    newStack.pop();
    setPathStack(newStack);
    fetchRepoTree(newStack[newStack.length - 1] || '');
    setFileContent(null);
  };

  const handleDownloadFile = () => {
    if (fileContent) {
      const blob = new Blob([fileContent.content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileContent.name;
      a.click();
    }
  };

  const handleDownloadRepoZip = () => {
    let zipUrl;
    if (provider === 'github') {
      zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;
    } else if (provider === 'gitlab') {
      zipUrl = `https://gitlab.com/api/v4/projects/${encodeURIComponent(repoName)}/repository/archive.zip`;
    } else if (provider === 'bitbucket') {
      zipUrl = `https://bitbucket.org/${repoName}/get/main.zip`;
    }
    if (zipUrl) {
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = `${repo}.zip`;
      a.click();
    }
  };

  return (
    <div className="repo-explorer">
      <button className="back-btn" onClick={onBack}>⬅ Back to Repo List</button>
      {pathStack.length > 0 && (
        <button className="back-folder-btn" onClick={handleBack}>⬅ Back Folder</button>
      )}
      <button className="download-zip-btn" onClick={handleDownloadRepoZip}>⬇ Download Full Repo (ZIP)</button>

      <div className="pr-info">
        <span>🟢 Open PRs: {pullsCount.open}</span>
        <span>🔴 Closed PRs: {pullsCount.closed}</span>
        {latestPRDate && <span>📅 Latest PR: {new Date(latestPRDate).toLocaleDateString()}</span>}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !fileContent && (
        <ul className="file-list">
          {repoTree.map(item => (
            <li key={item.path} onClick={() => handleItemClick(item)}>
              {item.type === 'tree' ? '📁' : '📄'} {item.path.split('/').pop()}
            </li>
          ))}
        </ul>
      )}

      {fileContent && (
        <div className="file-viewer">
          <div className="file-header">
            <h4>{fileContent.name}</h4>
            <button onClick={handleDownloadFile}>⬇ Download File</button>
          </div>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
            {fileContent.content}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default RepoExplorer;

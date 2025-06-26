import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { useLocation, useHistory } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

import "./index.css";

const Dashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [username, setUsername] = useState('');
  
  const location = useLocation();
  const history = useHistory();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const tokenFromURL = params.get("token");
  const accessTokenFromURL = params.get("accessToken");
  const providerFromURL = params.get("provider");

  if (tokenFromURL) {
    localStorage.setItem("ovamToken", tokenFromURL);
    console.log("✅ Logged in with token:", tokenFromURL);
  }

  if (accessTokenFromURL && providerFromURL) {
    localStorage.setItem("oauthToken", accessTokenFromURL);
    localStorage.setItem("oauthProvider", providerFromURL);
    console.log("✅ OAuth Info:", { accessTokenFromURL, providerFromURL });
  }

  const token = tokenFromURL || localStorage.getItem("ovamToken");

  if (!token) {
    history.push("/");
  } else {
    try {
      const decoded = jwtDecode(token);
      if (decoded?.name) {
        setUsername(decoded.name);
      }
    } catch (err) {
      console.error("❌ Invalid token");
      localStorage.removeItem("ovamToken");
      history.push("/");
    }
  }
}, [location, history]);

  return (
    <div className="dashboard">
      <Sidebar
        user={username}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onLogout={onLogout}
      />
      <MainContent
        activeSection={activeSection}
        sidebarCollapsed={sidebarCollapsed}
        username={username}
      />
    </div>
  );
};

export default Dashboard;

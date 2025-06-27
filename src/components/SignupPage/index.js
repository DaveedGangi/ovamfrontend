import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // ✅ for navigation
import "./index.css";
import { FaGithub, FaGitlab, FaBitbucket, FaCloud } from "react-icons/fa";

function SignupPage() {
  const [activeTab, setActiveTab] = useState("saas");
  const history = useHistory();

  // ✅ Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem("ovamToken");
    if (token) {
      history.push("/dashboard");
    }
  }, [history]);

  const handleLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}?prompt=login`;
  };

  return (
    <div className="container">
      <div className="logo">🟠</div>
      <h1 className="title">ovam ai</h1>
      <h2 className="subtitle">Welcome to ovam ai</h2>
      <p className="description">
        Get a 14-day free trial for your entire team by signing up with your Git provider.
      </p>

      <div className="tab-container">
        <button
          className={activeTab === "saas" ? "tab active" : "tab"}
          onClick={() => setActiveTab("saas")}
        >
          SaaS
        </button>
        <button
          className={activeTab === "self" ? "tab active" : "tab"}
          onClick={() => setActiveTab("self")}
        >
          Self-Hosted
        </button>
      </div>

      <div className="button-container">
        <button onClick={() => handleLogin("github")}>
          <FaGithub className="icon" /> Sign up with GitHub
        </button>
        <button onClick={() => handleLogin("gitlab")}>
          <FaGitlab className="icon" /> Sign up with GitLab
        </button>
        <button onClick={() => handleLogin("azure")}>
          <FaCloud className="icon" /> Sign up with Azure DevOps
        </button>
        <button onClick={() => handleLogin("bitbucket")}>
          <FaBitbucket className="icon" /> Sign up with Bitbucket Cloud
        </button>
      </div>

      <p className="footer">
        By continuing, you agree to the <a href="/terms">Terms of Use</a> and <a href="/privacy">Privacy Policy</a> applicable to CodeRabbit.
      </p>
    </div>
  );
}

export default SignupPage;

import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const ProgressReporting = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
  
    setStats({
      totalTasks: 20,
      completedTasks: 8,
      inProgressTasks: 5,
      pendingTasks: 7,
    });
  }, []);

  return (
    <div className="dashboard-section">
      <h2>Progress Reporting</h2>
      <div className="report-grid">
        <div className="report-card">
          <h3>Total Tasks</h3>
          <p>{stats.totalTasks}</p>
        </div>
        <div className="report-card">
          <h3>Completed</h3>
          <p>{stats.completedTasks}</p>
        </div>
        <div className="report-card">
          <h3>In Progress</h3>
          <p>{stats.inProgressTasks}</p>
        </div>
        <div className="report-card">
          <h3>Pending</h3>
          <p>{stats.pendingTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressReporting;

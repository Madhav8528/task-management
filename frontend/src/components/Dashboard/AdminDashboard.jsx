import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../../../public/models/Animation - 1742362225776.json';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      <section className="admin-content">
        <p>Welcome, Admin! Manage users, tasks, or system-wide settings here.</p>

        <div className="lottie-container">
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: 300, height: 300 }}
          />
        </div>
      </section>
    </div>
  );
}

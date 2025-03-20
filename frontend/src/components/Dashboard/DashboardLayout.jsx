import React, { useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function DashboardLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser || loggedInUser.role !== 'user') {
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <Link to="/dashboard/deadline-tracking">Deadline Tracking</Link>
        <Link to="/dashboard/real-time-collaboration">Real-Time Collaboration</Link>
        <Link to="/dashboard/secure-auth">Secure Auth</Link>
        <Link to="/dashboard/task-assignment">Task Assignment</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}

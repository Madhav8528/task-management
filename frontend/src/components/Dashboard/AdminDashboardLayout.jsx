import React, { useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import './Dashboard.css'

export default function AdminDashboardLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (!loggedInUser || loggedInUser.role !== 'admin') {
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
        <Link to="/admin">Admin Home</Link>
        <Link to="/admin/manage-users">Manage Users</Link>
        <Link to="/admin/manage-tasks">Manage Tasks</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  )
}

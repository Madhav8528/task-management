import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'

import AdminDashboardLayout from './components/Dashboard/AdminDashboardLayout'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ManageUsers from './components/Dashboard/ManageUsers'
import ManageTasks from './components/Dashboard/ManageTasks'
import ManageRoles from './components/Dashboard/ManageRoles'

import DashboardLayout from './components/Dashboard/DashboardLayout'
import DeadlineTracking from './components/Dashboard/DeadlineTracking'
import RealTimeCollaboration from './components/Dashboard/RealTimeCollaboration'
import SecureAuth from './components/Dashboard/SecureAuth'
import TaskAssignment from './components/Dashboard/TaskAssignment'
import ProgressReporting from './components/Dashboard/ProgressReporting'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      
<Route path="/admin" element={<AdminDashboardLayout />}>
  <Route index element={<AdminDashboard />} />
  <Route path="manage-users" element={<ManageUsers />} />
  <Route path="manage-tasks" element={<ManageTasks />} />

  <Route path="manage-roles" element={<ManageRoles />} />
</Route>


      <Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="deadline-tracking" element={<DeadlineTracking />} />
  <Route path="progress-reporting" element={<ProgressReporting />} />
  <Route path="real-time-collaboration" element={<RealTimeCollaboration />} />
  <Route path="secure-auth" element={<SecureAuth />} />
  <Route path="task-assignment" element={<TaskAssignment />} />
</Route>
    </Routes>
  )
}

export default App

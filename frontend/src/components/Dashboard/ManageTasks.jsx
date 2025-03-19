import React, { useState, useEffect } from 'react'
import './Dashboard.css' 

export default function ManageTasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    setTasks(storedTasks)
  }, [])

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!title || !assignedTo || !dueDate) {
      setError('Please fill out all fields.')
      return
    }

    const newTask = {
      id: Date.now(),
      title,
      assignedTo,
      dueDate,
      status: 'Open'
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))

    setTitle('')
    setAssignedTo('')
    setDueDate('')
    setError('')
  }

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  const handleStatusChange = (id, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: newStatus }
      }
      return task
    })
    setTasks(updatedTasks)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  }

  return (
    <div className="manage-tasks-container">
      <h2>Manage Tasks</h2>

      <form onSubmit={handleAddTask} className="manage-tasks-form">
        <div className="form-group">
          <label>Task Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Assigned To:</label>
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Add Task</button>
      </form>

      <h3>Existing Tasks</h3>
      <div className="manage-tasks-table-container">
        <table className="manage-tasks-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="manage-tasks-table-row">
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>{task.dueDate}</td>
                <td>
                  <select
                    className="status-select"
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDeleteTask(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

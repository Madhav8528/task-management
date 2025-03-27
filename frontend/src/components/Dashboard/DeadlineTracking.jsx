import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './Dashboard.css'

export default function DeadlineTracking() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('Pending')
  const [error, setError] = useState('')

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const username = loggedInUser?.username || 'guest'

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(`tasks_${username}`)) || []
    setTasks(storedTasks)
  }, [username])

  useEffect(() => {
    localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks))
  }, [tasks, username])

  useEffect(() => {
    const overdueTasks = tasks.filter((task) => isOverdue(task.dueDate))
    if (overdueTasks.length > 0) {
      toast.warning(`You have ${overdueTasks.length} overdue task(s).`)
    }
  }, [tasks])

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!title || !dueDate) {
      setError('Please enter both a task title and due date.')
      return
    }
    const newTask = {
      id: Date.now(),
      title,
      dueDate,
      status,
    }
    setTasks([...tasks, newTask])
    setTitle('')
    setDueDate('')
    setStatus('Pending')
    setError('')
  }

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
  }

  const isOverdue = (dueDateStr) => {
    const today = new Date().setHours(0, 0, 0, 0)
    const due = new Date(dueDateStr).setHours(0, 0, 0, 0)
    return due < today
  }

  return (
    <div className="deadline-tracking-container">
      <h2 className="dt-heading">Deadline Tracking &amp; Notifications</h2>
      <p className="dt-description">
        Add tasks with deadlines, update their statuses, and see overdue tasks highlighted.
      </p>

      <form onSubmit={handleAddTask} className="dt-form">
        <div className="form-group">
          <label>Task Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
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
        <div className="form-group">
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {error && <p className="dt-error">{error}</p>}
        <button type="submit" className="dt-add-btn">Add Task</button>
      </form>

      <div className="dt-table-container">
        {tasks.length > 0 ? (
          <table className="dt-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Overdue?</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const overdue = isOverdue(task.dueDate)
                return (
                  <tr key={task.id} className={`dt-table-row ${overdue ? 'overdue' : 'on-time'}`}>
                    <td>{task.title}</td>
                    <td>{task.dueDate}</td>
                    <td>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>{overdue ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => handleDeleteTask(task.id)} className="dt-delete-btn">Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <p className="dt-no-tasks">No tasks available. Please add a task.</p>
        )}
      </div>
    </div>
  )
}

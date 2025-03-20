import React, { useState } from 'react';
import './Dashboard.css';

const TaskAssignment = () => {
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleAssignTask = (e) => {
    e.preventDefault();
    console.log({ taskName, assignee, priority, description });
    setMessage(`Task "${taskName}" assigned to ${assignee} successfully!`);
    setTaskName('');
    setAssignee('');
    setPriority('Medium');
    setDescription('');
  };

  return (
    <div className="dashboard-section">
      <h2>Task Assignment & Prioritization</h2>
      <form className="dashboard-form" onSubmit={handleAssignTask}>
        <div className="form-group">
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            placeholder="Enter task name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="assignee">Assignee:</label>
          <input
            type="text"
            id="assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
            placeholder="e.g., John Doe"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional details..."
          />
        </div>

        <button type="submit" className="dashboard-btn">Assign Task</button>
      </form>

      {message && <div className="success-message">{message}</div>}
    </div>
  );
};

export default TaskAssignment;

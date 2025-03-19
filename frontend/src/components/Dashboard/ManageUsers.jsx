import React, { useState, useEffect } from 'react';
import './Dashboard.css'; 
export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill out all fields.');
      return;
    }
    if (users.some(u => u.username === username)) {
      setError('User already exists.');
      return;
    }
    const newUser = { username, password };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleDeleteUser = (delUsername) => {
    const updatedUsers = users.filter(u => u.username !== delUsername);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <form onSubmit={handleAddUser} className="manage-users-form">
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Add User</button>
      </form>
      <h3>Existing Users</h3>
      <ul className="manage-users-list">
        {users.map((user, index) => (
          <li key={index}>
            <strong>{user.username}</strong>
            <button onClick={() => handleDeleteUser(user.username)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

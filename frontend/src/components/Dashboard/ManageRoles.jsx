import React, { useEffect, useState } from 'react'

export default function ManageRoles() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || []
    setUsers(storedUsers)
  }, [])

  const handleRoleChange = (username, newRole) => {
    const updatedUsers = users.map((u) => {
      if (u.username === username) {
        return { ...u, role: newRole }
      }
      return u
    })
    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  return (
    <div>
      <h2>Manage Roles</h2>
      <p>Change the roles of existing users. Only the admin can see this page.</p>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Username</th>
              <th style={{ border: '1px solid #ccc', padding: '8px' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              if (user.username === 'admin') {
                return null
              }
              return (
                <tr key={user.username}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {user.username}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    <select
                      value={user.role || 'viewer'}
                      onChange={(e) => handleRoleChange(user.username, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

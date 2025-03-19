import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

export default function SignUp() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = (e) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Please fill out all fields.')
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    const userExists = users.find((u) => u.username === username)

    if (userExists) {
      setError('User already exists. Please choose another username.')
      return
    }

    const newUser = {
      username,
      password,
      role: 'viewer',
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    navigate('/login')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp} className="auth-form">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

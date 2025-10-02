import React, { useState, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import '../../styles/login.css'

export default function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (username && password) {
      dispatch(login('mock-token'))
      navigate('/dashboard')
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>

        <label htmlFor="username" className="login-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          className="login-input"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />

        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="login-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />

        <button className="login-button" type="submit" disabled={!username || !password}>
          Login
        </button>
      </form>
    </div>
  )
}

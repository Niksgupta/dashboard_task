import  React, { useState, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (username && password) {
      dispatch(login('mock-token'));
      navigate('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Username</label><br />
        <input value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" disabled={!username && !password}>Login</button>
    </form>
  )
}

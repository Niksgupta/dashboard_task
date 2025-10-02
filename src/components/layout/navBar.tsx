import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

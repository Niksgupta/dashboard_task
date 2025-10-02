import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './app/store'
import Login from './components/auth/Login'
import Dashboard from './components/layout/Dashboard'

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

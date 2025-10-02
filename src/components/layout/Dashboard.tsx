import React from 'react'
import Sidebar from './Sidebar'
import WidgetContainer from '../WidgetContainer'
import Navbar from './navBar'

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <Navbar />
        <WidgetContainer />
      </main>
    </div>
  )
}

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Driver from './pages/Driver'
import SystemDashboard from './pages/SystemDashboard'
import Home from './pages/Home'
import AppBar from './components/TopAppBar.js'
import Clock from './components/Clock.js'

const App = () => (
  <Router>
    <AppBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/system-dashboard' element={<SystemDashboard />} />
      <Route path='/driver' element={<Driver />} />
    </Routes>
    <Clock />
  </Router>
)

export default App;

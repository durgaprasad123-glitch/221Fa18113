import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Stats from './components/Stats'
import Redirector from './components/Redirector'

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/:shortId" element={<Redirector />} />
      </Routes>
    </Router>
  )
}

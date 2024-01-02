import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import ChatPage from './components/ChatPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

const App = () => {
  const mode = useSelector(state => state.mode.mode)
  return (
    <div className='App' 
      style={{backgroundColor: mode === 'light' ? '#EDEFF1' : '#292929', 
              color: mode === 'light' ? 'black' : '#DDDDDD'}}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
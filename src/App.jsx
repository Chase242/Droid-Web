import {Route, BrowserRouter, Routes, Link } from 'react-router-dom'
import HomeScreen from './home/HomeScreen'
import React from 'react'
import MensurationScreen from './mensurations/MensurationScreen';
import RecordingScreen from './recording/RecordingScreen';
import NavBar from './NavBar';

function App() {
  
  return (
    
    <>
      
      <NavBar/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="gravar" element={<RecordingScreen/>} />
          <Route path="medicoes" element={<MensurationScreen/>} />
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App

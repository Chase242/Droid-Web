import {Route, BrowserRouter, Routes, Link, HashRouter } from 'react-router-dom'
import HomeScreen from './home/HomeScreen'
import React from 'react'
import MensurationScreen from './mensurations/MensurationScreen';
import RecordingScreen from './recording/RecordingScreen';
import NavBar from './NavBar';
import MensurationDetailsScreen from './mensurations/MensurationDetailsScreen';

function App() {
  
  return (
    
    <>
      
      <NavBar/>
      <HashRouter >
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/gravar" element={<RecordingScreen/>} />
          <Route path="/medicoes" element={<MensurationScreen/>} />
          <Route path="/medicoes/:id" element={<MensurationDetailsScreen/>} />
        </Routes>
      </HashRouter>
    
    </>
  )
}

export default App

import {Route, BrowserRouter, Routes, Link } from 'react-router-dom'
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
      <BrowserRouter basename='/Droid-Web/'>
        <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="gravar" element={<RecordingScreen/>} />
          <Route path="medicoes" element={<MensurationScreen/>} />
          <Route path="medicoes/:id" element={<MensurationDetailsScreen/>} />
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App

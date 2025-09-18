// src/App.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';


function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        {/* Muestra el login al usuario cuando entra en la página. */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Toma la ruta del dashboard para mostrarlo al usuario */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        
        {/* <Route path="/quests" element={<QuestLogPage />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
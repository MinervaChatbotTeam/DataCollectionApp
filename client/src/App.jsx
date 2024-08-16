// src/App.js

import React, { useState } from 'react';
import Chat from './components/chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main';

const baseURL = "https://datacollectionapp.onrender.com"//"http://localhost:3000"//






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;

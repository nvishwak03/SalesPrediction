// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import UploadData from './components/UploadData';
import Visualizations from './components/Visualizations';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/uploaddata" element={<UploadData />} />
        <Route path="/visualizations" element={<Visualizations />} />
      </Routes>
    </Router>
  );
};

export default App;

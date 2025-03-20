import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Stats from './Pages/Stats';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/stats" element={<Stats/>} />
      </Routes>
    </>
  );
};

export default App;

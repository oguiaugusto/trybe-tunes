import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <HashRouter>
      <Routes />
    </HashRouter>
  );
}

export default App;

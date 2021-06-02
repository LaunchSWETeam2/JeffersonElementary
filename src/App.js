import React from 'react';
import './css/index.css'
import CalendarApp from './components/Calendar.js'
//testing
import Dashboard from './components/Dashboard'
import Homepage from './components/Homepage'

import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Dashboard/>
      </Router>
    </div>
  );
}

export default App;

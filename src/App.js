import React from 'react';
import './css/index.css'
import CalendarApp from './components/Calendar.js'
//testing
import Dashboard from './components/Dashboard'
import Homepage from './components/Homepage'

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import TeacherDirectory from './components/TeacherDirectory'
import Calendar from './components/Calendar'
import ClassDirectory from './components/ClassDirectory'
import StudentDirectory from './components/StudentDirectory'

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

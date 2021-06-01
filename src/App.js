import React from 'react';
import './css/index.css'
import CalendarApp from './components/Calendar.js'
//testing
import Dashboard from './components/Dashboard'
import Homepage from './components/Homepage'

function App() {
  return (
    <div>
      <Homepage/>
      <Dashboard/>
      <CalendarApp/>
    </div>
  );
}

export default App;

import React from "react";
import AuthProvider from './context/AuthContext'
import "./css/index.css";
//testing
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Dashboard></Dashboard>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

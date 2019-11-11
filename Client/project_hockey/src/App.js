import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Route path="/" exact render={
        (routeProps) =>
          <Login
            redirectPathOnSuccess="/HomePage"
            {...routeProps}
          />
      } />
    </Router>
  );
}

export default App;

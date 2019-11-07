import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Route path="/" exact render={
        (routeProps) =>
          <Header
            redirectPathOnSuccess="/HomePage"
            {...routeProps}
          />
      } />
    </Router>
  );
}

export default App;

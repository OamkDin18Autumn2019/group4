import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import BurgerMenu from './components/BurgerMenu';
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
      <BurgerMenu />
    </Router>
  );
}

export default App;

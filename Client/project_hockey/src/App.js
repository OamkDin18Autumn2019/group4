import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';


export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      UserInfo: null,
      isAuthenticated: false
    };
  }  

  onLogin = () => {
    this.setState({ isAuthenticated: true });
  }

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
  }

  onLogout = () => {
    this.setState({ isAuthenticated: false});
  }

  setUserInfo = (username) => {
    this.setState({ UserInfo: { username }});
  }

  render(){
    return (
      <Router>
        <Route path="/" exact render={
          (routeProps) =>
            <LoginPage
              loginSuccess = { this.onLogin }
              loginFail = { this.onLoginFail }
              setUserInfo = { this.setUserInfo }
              redirectPathOnSuccess="/HomePage"
              {...routeProps}
            />
          } 
        />

        <ProtectedRoute isAuthenticated={this.state.isAuthenticated} path="/HomePage" exact render={
            (routeProps) =>
              <HomePage
                UserInfo={ this.state.UserInfo }
              />
          }>          
        </ProtectedRoute>
      </Router>
    );
  }
}

import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';
import Header from './components/NotLoggedinHeader';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import MainWindow from './components/MainWindow';


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

  setUserInfo = (username, id) => {
    this.setState({ UserInfo: { username, id }});
  }

  render(){
    return (
      <div>
        
      <Router>
        <Route path="/" exact render={
          (routeProps) =>
          
            <Header
              loginSuccess = { this.onLogin }
              loginFail = { this.onLoginFail }
              setUserInfo = { this.setUserInfo }
              redirectPathOnSuccess="/HomePage"
              {...routeProps}
            />
            
          } 
        />

        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}  path="/HomePage" exact render={
            (routeProps) =>
            <div>
              <HomePage
                UserInfo={ this.state.UserInfo }
              />
              <MainWindow
                UserInfo={ this.state.UserInfo }
              /> </div>
          }>   
             
        </ProtectedRoute>
      </Router>
        
      
          
      </div>
    );
  }
}

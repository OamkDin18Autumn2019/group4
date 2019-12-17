import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import './App.css';
import Header from './components/NotLoggedinHeader';
import LoginAfterSignup from './components/LoginAfterSignup';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import MainWindow from './components/MainWindow';
import MyTeam from './components/MyTeam';
import MyMatches from './components/MyMatches';
import UserView from './components/UserView';


export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      UserInfo: null,
      isAuthenticated: false,
      location: ""
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

  setUserInfo = (id, username/*, teamid, goals, assists, email, role, handness*/) => {
    this.setState({ UserInfo: { id, username/*, teamid, goals, assists, email, role, handness*/}});
  }

  /*
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }

  }
  */

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
              location = {this.state.location}
              redirectPathOnSuccess="/HomePage"
              {...routeProps}
            />
          } 
        />

        <Route path="/LoginAfterSignup" exact render={
          (routeProps) =>
          
            <LoginAfterSignup
              loginSuccess = { this.onLogin }
              loginFail = { this.onLoginFail }
              setUserInfo = { this.setUserInfo }
              location = {this.state.location}
              redirectPathOnSuccess="/HomePage"
              {...routeProps}
            />
          } 
        />

        <ProtectedRoute isAuthenticated={this.state.isAuthenticated} path="/users/:id" exact render={
          (routeProps) =>
          
            <UserView
              loginSuccess = { this.onLogin }
              loginFail = { this.onLoginFail }
              setUserInfo = { this.setUserInfo }
              location = {this.state.location}
              UserInfo={ this.state.UserInfo }
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
              />
            </div>
          }></ProtectedRoute>

        <ProtectedRoute isAuthenticated={this.state.isAuthenticated}  path="/MyTeam" exact render={
            (routeProps) =>
            <div>

              <MyTeam
                UserInfo={ this.state.UserInfo }
              /> 
            </div>
            
          }></ProtectedRoute>

          <ProtectedRoute isAuthenticated={this.state.isAuthenticated}  path="/MyMatches" exact render={
            (routeProps) =>
            <div>

              <MyMatches
                UserInfo={ this.state.UserInfo }
              /> 
            </div>
            
          }></ProtectedRoute>
      </Router>
        
      
          
      </div>
    );
  }
}
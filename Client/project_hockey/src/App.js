import React from 'react';
import logo from './logo.svg';
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

  /*componentDidMount(){
    if(sessionStorage.getItem('login') === 'true'){
      this.setState({ isAuthenticated: true });
      console.log(sessionStorage.getItem('login'));
      console.log(this.state.isAuthenticated);
      this.setUserInfo(sessionStorage.getItem("id"), sessionStorage.getItem("username"));
      this.context.history.push("/HomePage");
    }
  }*/

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }

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
              location = {this.state.location}
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

  setUserInfo = (username) => {
    this.setState({ UserInfo: { username }});
  }

  setUserInfo = (id, username/*, teamid, goals, assists, email, role, handness*/) => {
    this.setState({ UserInfo: { id, username/*, teamid, goals, assists, email, role, handness*/}});
  }

  /*componentDidMount(){
    if(sessionStorage.getItem('login') === 'true'){
      this.setState({ isAuthenticated: true });
      console.log(sessionStorage.getItem('login'));
      console.log(this.state.isAuthenticated);
      this.setUserInfo(sessionStorage.getItem("id"), sessionStorage.getItem("username"));
      this.context.history.push("/HomePage");
    }
  }*/

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }

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
              location = {this.state.location}
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



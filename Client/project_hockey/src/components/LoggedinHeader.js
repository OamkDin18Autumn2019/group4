import React, { Component } from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';
import Search from './SearchBar';
import axios from 'axios';
import APIconnection from '../APIconnection.json';


export default class Header extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
        search: []
      };
    }  
    componentDidMount()
    {
        axios.get(APIconnection.baseAddress + '/users')
        .then(res =>
            {
                this.setState({ search: res.data});
            })
    }
    
    logout()
    {
        sessionStorage.clear();
        window.location.reload();
        console.log("Logged out");
    }

    render(){
        const testi = this.state.search.map(x => x.username)
        console.log(testi)
        return (
        <div>
            <div>Hello Hockey World</div>
            <div className="headerbody">

            <Search content={testi}/> 
            

                <div className="login-container">
                    <button type="submit" onClick={this.logout}>Logout</button>
                </div>
            </div>
        </div>
    )}
}
    /*

export default function Header(props) 
{

    function logout()
    {
        sessionStorage.clear();
        window.location.reload();
        console.log("Logged out");

    }

    render (){
        const mappedresults = this.state.search.map((result)=><li key={result.id}>{result.username}</li>);
        const testi = this.state.search
        return (
        <div>
            <div>Hello Hockey World</div>
            <div className="headerbody">

            <Search content={testi}/> 

                <div className="login-container">
                    <button type="submit">HAMBURGER</button>
                    <button type="submit" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )}
}*/
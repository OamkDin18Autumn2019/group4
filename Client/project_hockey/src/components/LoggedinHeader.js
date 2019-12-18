import React, { Component } from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';
import Search from './SearchBar';
import axios from 'axios';
import APIconnection from '../APIconnection.json';
import BurgerMenu from './BurgerMenu';


export default class Header extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
        search: ["Mäntylä Mooses", "Kaukovainio Lions","Rajakylä Rams", "Ruukki Hillbillies", "Kastelli Otters"]
      };
    }  
    componentDidMount()
    {
        axios.get(APIconnection.baseAddress + '/users')
        .then(res =>
            {
                this.setState({ search: res.data});
            }
        )
        
    }
    
    //Logging out by clearing the storage and reloading the page to redirect to login page
    logout()
    {
        sessionStorage.clear();
        window.location.reload();
    }

    render(){
        //Header for main page
        return (
        <div>
            <div>Hello Hockey World</div>
            <div className="headerbody">

            <Search content={this.state.search}/> 
            

                <div className="login-container">
                    <button type="submit" onClick={this.logout}>Logout</button>
                </div>
            </div>
            <BurgerMenu />
        </div>
    )}
}

import React, { Component } from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';
import Search from './SearchBar';
import axios from 'axios';
import APIconnection from '../APIconnection.json';
import BurgerMenu from './BurgerMenu';
import hockeylogo from '../hockeylogo.svg';


export default class Header extends Component {
    constructor(props)
    {
      super(props);
      this.state = {
        search: ["Mäntylä Moose", "Kaukovainio Lions","Rajakylä Rams", "Ruukki Hillbillies", "Kastelli Otters"]
      };
    }  
    componentDidMount()
    {
        axios.get(APIconnection.baseAddress + '/users')
            .then(res => {
                this.setState({ search: res.data });
            }
    //Logging out by clearing the storage and reloading the page to redirect to login page
    logout()
    {

        sessionStorage.clear();
        window.location.reload();
    }

    render() {

    render(){
        //Header for main page
        return (
            <div>
                <div>
                    <div className="hockeylogo">
                        <img className="yetiLogo" src={hockeylogo} />
                    </div>
                </div>
                <div className="headerbody">

                    <Search content={this.state.search} />


                    <div className="login-container">
                        <button type="submit" onClick={this.logout}>Logout</button>
                    </div>
                </div>
                <BurgerMenu />
            </div>
        )
    }
}


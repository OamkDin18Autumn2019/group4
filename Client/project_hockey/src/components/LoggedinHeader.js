import React, { Component } from 'react';
import './HeaderStyle.css';
import './LoginStyle.css';
import Search from './SearchBar';
import axios from 'axios';
import {Link} from 'react-router-dom';
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
            });
    }
    


    render(){
        //Header for main page
        return (
            <div>
                <div>
                    <div className="hockeylogo">
                        <Link to={"/HomePage"}><img className="yetiLogo" src={hockeylogo}  /></Link>
                    </div>
                </div>
                <div className="headerbody">
                    <Search content={this.state.search} />
                </div>
                <BurgerMenu />
            </div>
        )
    }
}


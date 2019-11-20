import React, { Component } from 'react'
import axios from 'axios';
import APIconnection from '../APIconnection.json';

export default class UserSearch extends Component {
    state = {
        users: [],
    };
    componentDidMount()
    {
        axios.get(APIconnection.baseAddress + '/users')
        .then(res =>
            {
                console.log(res);
                this.setState({ users: res.data});
            })
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.users.map(user=> <li>{user.id}</li>)}
                </ul>
            </div>
        )
    }
}

import React, {Component} from 'react'
import "./VSBlockStyle.css"
import APIconnection from '../APIconnection.json';
import axios from 'axios';


export default class VSBlock extends Component  {
  constructor(props)
  {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount()
  {
      axios.get(APIconnection.baseAddress + '/users')
      .then(res =>
          {
              this.setState({ users: res.data});
          })
  }
  render(){  
    return (
      <div className="VSBlock">
        <div>
          <h1>Next game</h1>
        </div>
        <div>
          <img alt="ayeelmao" className="VSBlock_hometeamimg"></img>
        </div>
        <div>
          <img alt="ayeelmao" className="VSBlock_awayteamimg"></img>
        </div>
        <div>
          <p>date here</p>
        </div>
      </div>
    )}
}
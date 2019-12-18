import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import APIconnection from '../APIconnection.json';
import axios from 'axios';
import "./StatsBlockStyle.css";

export default class StatsBlock extends Component  {
  constructor(props)
  {
    super(props);
    this.state = {
      users: [],
      teams: []
    };
  }
  componentDidMount()
  {
      axios.get(APIconnection.baseAddress + '/usergoals')
      .then(res =>
          {
              this.setState({ users: res.data});
          })
      axios.get(APIconnection.baseAddress + '/teams')
      .then(res =>
          {
              this.setState({ teams: res.data});
          })
  }
  render(){ 
    var mappedplayers = this.state.users.map(x => x)
    var limitplayers = mappedplayers.slice(0,5)
    var players = limitplayers.sort((a, b) => b.goals - a.goals).map
                          ((result, i) => 
                          <li key={i}><Link to={ `/users/${result.id}` }>{result.username}, {result.goals} goals</Link></li>);
    var mappedteams = this.state.teams.map(x => x)
    var teams = mappedteams.sort((a, b) => b.teamwins - a.teamwins).map
                          ((result, i) => 
                          <li key={i}><Link to={ `/teams/${result.teamid}` }>{result.teamname}, {result.teamwins} wins</Link></li>);
    return (
      <div className="StatsBlock">
        <div>
          <h2>Team Stats</h2>
          <ul>
              {teams}
          </ul>
        </div>
        <div>
          <h2> TOP scorers</h2>
          <ul>
              {players}
          </ul>
        </div>
        <div>
          <h2>LMAO what here</h2>
          <ul>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
              <li>lorem ipsum</li>
          </ul>
        </div>
      </div>
    )
  }
}
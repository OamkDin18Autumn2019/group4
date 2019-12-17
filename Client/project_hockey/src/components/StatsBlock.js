import React, {Component} from 'react'
import APIconnection from '../APIconnection.json';
import axios from 'axios';

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
      axios.get(APIconnection.baseAddress + '/users')
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
    var players = mappedplayers.sort((a, b) => a.goals - b.goals).map
                          ((result, i) => 
                          <li key={i}>{result.username} {result.goals}</li>);
    var mappedteams = this.state.teams.map(x => x)
    var teams = mappedteams.sort((a, b) => a.teamid - b.teamid).map
                          ((result, i) => 
                          <li key={i}>{result.teamname}</li>);
    return (
      <div className="StatsBlock">
        <div>
          <h2>Team Stats</h2>
          <ul>
              {teams}
          </ul>
        </div>
        <div>
          <h2>Player Stats</h2>
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
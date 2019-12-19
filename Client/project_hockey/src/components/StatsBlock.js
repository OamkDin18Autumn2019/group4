import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import APIconnection from '../APIconnection.json';
import axios from 'axios';
import "./StatsBlockStyle.css";

export default class StatsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersA: [],
      teams: []
    };
  }
  componentDidMount() {
    axios.get(APIconnection.baseAddress + '/usergoals')
      .then(res => {
        this.setState({ users: res.data });
      })
    axios.get(APIconnection.baseAddress + '/userassists')
    .then(res => {
      this.setState({ usersA: res.data });
    })
    axios.get(APIconnection.baseAddress + '/teams')
      .then(res => {
        this.setState({ teams: res.data });
      })
  }
  render() {
    var mappedplayers = this.state.users.map(x => x)
    var mappedplayersA = this.state.usersA.map(x => x)
    var limitplayers = mappedplayers.slice(0, 5)
    var limitplayersA = mappedplayersA.slice(0, 5)
    var goals = limitplayers.sort((a, b) => b.goals - a.goals).map
                          ((result, i) => 
                          <li key={i}><Link to={ `/users/${result.id}` }>{result.username}, {result.goals} goals</Link></li>);
    var mappedteams = this.state.teams.map(x => x)
    var teams = mappedteams.sort((a, b) => b.teamwins - a.teamwins).map
                          ((result, i) => 
                          <li key={i}><Link to={ `/teams/${result.teamid}` }>{result.teamname}, {result.teamwins} wins</Link></li>);
    var assists = limitplayersA.sort((a, b) => b.assists - a.assists).map
                          ((result, i) => 
                          <li key={i}><Link to={ `/users/${result.id}` }>{result.username}, {result.assists} assists</Link></li>);
    return (
      <div className="StatsBlock">

        <div className="statsTeam">
          <h2>TOP TEAMS</h2>
          <ul style={{paddingLeft: 0}}>
            {teams}
          </ul>
        </div>

        <div className="topScores">
          <h2>TOP SCORERS</h2>
          <ul style={{paddingLeft: 0}}>
            {goals}
          </ul>
        </div>

        <div className="teamInfo">
          <h2>TOP WINGMANS</h2>
          <ul style={{paddingLeft: 0}}>
            {assists}
          </ul>
        </div>

      </div>
    )
  }
}
import React, { Component } from 'react'
import "./VSBlockStyle.css"
import APIconnection from '../APIconnection.json';
import axios from 'axios';
import team1 from './team-images/team1.png';
import team2 from './team-images/team2.png';


export default class VSBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      matches: []
    };
  }
  componentDidMount() {
    axios.get(APIconnection.baseAddress + '/users')
      .then(res => {
        this.setState({ users: res.data });
      })
    axios.get(APIconnection.baseAddress + '/allmatches')
      .then(res => {
        this.setState({ matches: res.data });
      }
      )
  }

  render() {
    let ParsedUser = JSON.parse(sessionStorage.getItem("User"));
    let ParsedTeam = JSON.parse(sessionStorage.getItem("Team"));
    var testi = ParsedUser.teamid;
    var mappedmatches = this.state.matches.map(x => x.matchdate)
    var latestmatch = String(mappedmatches[0])
    var date = latestmatch.slice(0, 10)

    console.log(date)

    return (
      <div className="VSBlock">
        <div className="vsbox">
          <div>
            <h1>Next game</h1>
          </div>
          <div>
            <img alt="ayeelmao" className="VSBlock_hometeamimg"></img>
          </div>
          <div>
            <img alt="ayeelmao2" className="VSBlock_awayteamimg"></img>
          </div>
          <div>
            <p>{date}</p>
          </div>
        </div>
      </div>
    )
  }
}
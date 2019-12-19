import React, { Component } from 'react'
import "./VSBlockStyle.css"
import APIconnection from '../APIconnection.json';
import axios from 'axios';
import team1 from './team-images/team1.png';
import team2 from './team-images/team2.png';
import team3 from './team-images/team3.png';
import vsteam from '../vsteam.svg';


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
    var hometeammap = this.state.matches.map(x => x.team1)
    var awayteammap = this.state.matches.map(x => x.team2)
    var hometeamslice = hometeammap[0]
    var awayteamslice = awayteammap[0]
    var team1image = null
    var team2image = null

    if (hometeamslice === "1") {
      team1image = team1;
    }
    if (awayteamslice === "2") {
      team2image = team2;
    }

    console.log(hometeamslice)

    return (
      <div className="VSBlock">
        <div className="vsbox">
          <h1 className="gametitle">Next Game</h1>
          <div>
            <img alt="ayeelmao" src={team1image} className="VSBlock_hometeamimg"></img>
          </div>


          <div>
            <img alt="ayeelmao2" src={team2image} className="VSBlock_awayteamimg"></img>
          </div>

          <div className="gametime">
            <p className="playtime">{date}</p>
          </div>

          <div>
            <div className="teamline">
              <img className="vsteam" src={vsteam} />
            </div>
          </div>



        </div>

      </div>
    )
  }
}
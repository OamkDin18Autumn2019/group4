import React, {useState, useEffect} from 'react';
import Header from './LoggedinHeader';
import BurgerMenu from './BurgerMenu';
import axios from 'axios';
import APIconnection from '../APIconnection';

export default function UserView(props) {
    const [User, setUser] = useState([]);
    const [Handedness, setHandedness] = useState("");
    const [Role, setRole] = useState("");
    //const [Points, setPoints]

    useEffect(() => { 
        const id = parseInt(props.match.params.id);

        axios.get(APIconnection.baseAddress + `/users/${id}`, {
          }).then(results => {
            if(results.data.length > 0){
                let Users = results.data.map((info) => {
                    const User_Info = {
                    id: info.id,
                    username: info.username,
                    teamid: info.teamid,
                    goals: info.goals,
                    assists: info.assists,
                    email: info.email,
                    role: info.role,
                    handedness: info.handness,
                }
                    return User_Info;
                });

                if(User.length == 1){
                    console.log(User[0]);
                    console.log(User[0].handedness);
                    if(User[0].handness === 0){
                        setHandedness("Righthanded");
                    }
                    else{
                        setHandedness("Lefthanded");
                    }

                    if(User[0].role === 0){
                        setRole("Center");
                    }
                    else if(User[0].role === 1){
                        setRole("Left Winger");
                    }
                    else if(User[0].role === 2){
                        setRole("Right Winger");
                    }
                    else if(User[0].role === 3){
                        setRole("Left Defenseman");
                    }
                    else if(User[0].role === 4){
                        setRole("Right Defenseman");
                    }
                    else{
                        setRole("Goalie")
                    }
                    console.log(User[0].goals + User[0].assists)
                }
                else{
                    setUser(Users);
                }
            }
            else{
  
            }
            
            
        });
    });

    return (
    <div style={{textAlign: "center"}}>

        <Header/>

        <div style={{ color: "black" }}>

            <div>
                <button onClick={() => props.history.goBack()}>Back</button>
                <div>
                    <div>
                        
                        {User.map(user => <h1>{user.username}</h1>)} 
                        <h2>{ Handedness } { Role }</h2>
                        <h3>Stats</h3>
                        {User.map(user => <p>{user.goals} goals and {user.assists} assists</p>)}  

                    <div>
                </div>
            </div>
        </div>
        </div>
        </div>
        <BurgerMenu />
    </div>
  )
}
import React, {useEffect} from 'react';
import Header from './LoggedinHeader';
//import axios from 'axios';
//import APIconnection from '../APIconnection';

export default function ManageTeam(props) {
    useEffect(() => { 

    });
    
    function manage(){

    }

    return (
    <div style={{textAlign: "center"}}>

        <Header/>

        <div style={{ color: "black" }}>
        <form onSubmit={manage} id="management">
            <br></br>
            <textarea placeholder="Enter info about your team here.." name="teaminfo" form="management"></textarea>
            <br></br>
            <button type="submit">Submit</button>
        </form>

        </div>
    </div>
  )
}
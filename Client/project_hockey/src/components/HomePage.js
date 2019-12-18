import React from 'react';
import Header from './LoggedinHeader';
import MainWindow from './MainWindow';

export default function HomePage(props) {

  //Parsing the userinfo in session storage
  let ParsedUser = JSON.parse(sessionStorage.getItem("User"));

  return (
    <div style={{textAlign: "center"}}>
      <Header/>

      <h1>Hello {ParsedUser.username}!</h1>

      <MainWindow />

    </div>
  )
}
import React from 'react';
import Header from './LoggedinHeader';

export default function HomePage(props) {
  return (
    <div style={{textAlign: "center"}}>
            <Header/>
      <h1>Hello {props.UserInfo.username}!</h1>

      <div style={{ color: "red" }}>
        <strong>Testings</strong>
      </div>  
    </div>
  )
}
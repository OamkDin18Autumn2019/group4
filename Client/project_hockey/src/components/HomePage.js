import React from 'react'

export default function HomePage(props) {
  return (
    <div style={{textAlign: "center"}}>
      <h1>Hello {props.UserInfo.username}!</h1>

      <div style={{ color: "red" }}>
        <strong>Testings</strong>
      </div>  
    </div>
  )
}
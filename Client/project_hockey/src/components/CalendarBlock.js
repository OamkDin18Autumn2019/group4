import React from 'react'

export default function CalendarBlock(props) {
  
  function data ()
  {

    
    var test123 = 1;

    if (test123==1)
     {
         return (
    <div>
      <h1>{props.UserInfo.username}</h1>
    </div>
         )
     }
  }
  
  return (
    <div>
      {data()}
      <h1>Dis is de calendarblock {props.UserInfo.id}</h1>
    </div>
  )
}
import React from 'react'
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { isAuthenticated, ...rest } = props;
  let output;

  if(isAuthenticated)
  {
    output = <Route {...rest} />
  }
  else
  {
    output = <Redirect to='/' />;
  }

  return (  
      <React.Fragment>{ output }</React.Fragment>
    )
}
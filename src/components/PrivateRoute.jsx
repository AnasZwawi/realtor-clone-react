import React from 'react'
import { Navigate, Outlet } from 'react-router';
import useAuthStatus from '../hooks/useAuthStatus';

function PrivateRoute() {
  const {loggedIn, checkingStatus} = useAuthStatus();
  if(checkingStatus){
    return <h1>Loading...</h1>
  }
  return (
    <>
      {loggedIn ? <Outlet/> : <Navigate to='/sign-in'/>}
    </>
  )
}

export default PrivateRoute
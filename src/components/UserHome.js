import React from 'react';
import ReactDOM from 'react-dom';

const UserHome = (props) =>{
  debugger
  return(
    <div>
      <h1> User {props.match.params.user_id} Home Page </h1>
      <button>Logout</button>
    </div>)
}

export default UserHome;

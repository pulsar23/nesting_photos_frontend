import React from 'react';
import ReactDOM from 'react-dom';

const Login = (props) =>{
  console.log(props)
  return(
    <div>
    <h2> Please log in: </h2>
      <form onSubmit={props.handleLogin}>
        <div>
          <input type="text" name="username" onChange={props.handleOnChange} placeholder="username" />
        </div>
        <div>
          <input type="password" name="password" onChange={props.handleOnChange} placeholder="password" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
      <h3>{props.loginError}</h3>
    </div>
  )
} //end const Login

export default Login;

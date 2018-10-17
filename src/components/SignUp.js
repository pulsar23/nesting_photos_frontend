import React from 'react';
import ReactDOM from 'react-dom';

const SignUp = (props) => {
  console.log(props)
  return(
    <div>
    <h2> Please Create Account: </h2>
      <form onSubmit={props.handleSignUp}>
        <div>
          <input type="text" name="username" placeholder="username" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="text" name="email" placeholder="email" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="password" name="password" placeholder="password" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default SignUp;

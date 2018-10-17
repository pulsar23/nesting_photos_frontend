import React from 'react';
import ReactDOM from 'react-dom';

const SignUp = (props) => {
  return(
    <div>
    <h2> Please Create Account: </h2>
      <form onSubmit={props.handleCreateAccount}>
        <div>
          <input type="text" placeholder="username" />
        </div>
        <div>
          <input type="text" placeholder="email" />
        </div>
        <div>
          <input type="text" placeholder="confirm email" />
        </div>
        <div>
          <input type="password" placeholder="password" />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default SignUp;

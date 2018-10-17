import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';


const Home = (props) => {
  return (
    <div>
      <h1>Welcome to Nested Photos</h1>
      <h2>Already Have an Account?</h2>
      <Link to={"/login"}><button >Log In</button></Link>
      <h2>Don't have an account?</h2>
      <Link to={"/signup"}><button >Create Account</button></Link>
    </div>
  );
}; //end const Home

export default Home;

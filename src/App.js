import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Home  from './components/Home.js'
import  Login  from './components/Login.js'
import  SignUp  from './components/SignUp.js'
import  UserHome from './components/UserHome.js'
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, NavLink, withRouter } from 'react-router-dom';

class App extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    currentUser: {}
  }
  componentDidMount(){
    //Check for token.
    // 1. IF and only if there is a token, make an authenticated request to
    // backend "/profile" route.
    // 2. With response from information, will fill in user information to
    // state as currentUser key.
    // 3. Redirect to user's "/profile" page.
    let token = localStorage.token
    //console.log(this)
    console.log("In componentDidMount")

    if (!!token && this.props.location.pathname === "/login"){
      fetch("http://localhost:3000/api/v1/users/profile", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => this.setState({currentUser: data}, ()=>{this.props.history.push(`/profile/${this.state.currentUser.id}`)}))
    }
  }//end componentDidMount

  handleOnChange = event =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignUp = event =>{
    event.preventDefault()
    console.log("handle Signup")
    fetch("http://localhost:3000/api/v1/users/",{
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data=>{
        localStorage.token = data.token
        this.setState({
          currentUser: data.user
        }, ()=>{this.props.history.push(`/profile/${this.state.currentUser.id}`)})
      })
  }

  handleLogin = event =>{

    event.preventDefault()
    fetch("http://localhost:3000/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        if (!data.error){
          console.log("hello world")
          localStorage.token = data.token
          this.setState({
            currentUser: data.user
          }, ()=>{this.props.history.push(`/profile/${this.state.currentUser.id}`)})
        }
        else{
          this.setState({
            loginError: data.error
          })
        }
      })
  }// end handleLogin

  handleLogout = event =>{
    console.log('handleLogout')
  }
//<Route path="/profile/:user_id" render={props=> <div> Hello World {props.match.params.user_id}</div>}/>
  render() {
    return (
      <div className="App">
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" render={props=> <Login handleLogin={this.handleLogin} handleOnChange={this.handleOnChange} loginError={this.state.loginError} {...props}/>} />
      <Route path="/profile/:user_id" render={props=> <UserHome handleLogout={this.handleLogout} {...props}/>} />
      <Route path="/signup" render={props=> <SignUp handleSignUp={this.handleSignUp} handleOnChange={this.handleOnChange} {...props}/>} />
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);

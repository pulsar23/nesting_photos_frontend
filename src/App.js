import React, { Component } from 'react';
import './App.css';
import  Home  from './components/Home.js'
import  Login  from './components/Login.js'
import  SignUp  from './components/SignUp.js'
import  UserHome from './components/UserHome.js'
import  Album from './components/Album.js'
import { Route, Switch, Redirect, NavLink, withRouter } from 'react-router-dom';

class App extends Component {

  state = {
    username: "",
    password: "",
    email: "",
    albums: [],
    title: "",
    isLoadedAlbums: false,
    toggleUpdate: true,
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

    //if (!!token && this.props.location.pathname === "/login"){
    if (!!token){
      fetch("http://localhost:3000/api/v1/users/profile", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => this.setState({currentUser: data, albums: data.albums, isLoadedAlbums: true},
          ()=>{if (this.props.location.pathname === '/login' || this.props.location.pathname === '/signup'){
          this.props.history.push(`/profile/${this.state.currentUser.id}`)}}))
    }
  }//end componentDidMount

  handleOnChange = (event) =>{

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
        if (data.user){
        localStorage.token = data.token
        this.setState({
          currentUser: data.user
        }, ()=>{this.props.history.push(`/profile/${this.state.currentUser.id}`)})
      }//if
      else{console.log(data)}
      })
  }

  handleLogin = event =>{
    console.log("In handleLogin")
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
        console.log(data);
        if (!data.error){
          localStorage.token = data.token
          debugger
          this.setState({
            currentUser: data.user,
            isLoadedAlbums: true
          }, ()=>{this.props.history.push(`/profile/${this.state.currentUser.id}`)})
        }
        else{
          this.setState({
            loginError: data.error
          })
        }
      })
  }// end handleLogin

  handleLogout = (userID) =>{
    localStorage.clear()
    this.setState({token: ""})
    this.props.history.push(`/`)
  }

  getToggleUpdate = () =>{
    console.log("getToggleUpdate", this.state.toggleUpdate)
    this.setState({toggleUpdate: !this.state.toggleUpdate})
  }

//*****************************************************
//The following code below handles Creating a New Album
//*****************************************************
  //
  // handleCreateAlbum = () =>{
  //   debugger
  //   console.log('handleCreateAlbum')
  //   let token = localStorage.token;
  //   let API_USER_ALBUMS = 'http://localhost:3000/api/v1/albums'
  //   console.log("token = ", token, "API_USER_ALBUMS = ", API_USER_ALBUMS)
  //   fetch(API_USER_ALBUMS, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     },
  //     body: JSON.stringify({
  //       "title": `${this.state.title}`,
  //       "admin_id": `${this.state.userID}`
  //     })
  //   })//end fetch
  //   .then(resp => resp.json())
  //   .then(data => console.log(data))
  // }//end handleCreateAlbum
  //
  // handleAlbumSubmit = (event) =>{
  //   debugger
  //   event.preventDefault()
  //   console.log("handleAlbumSubmit",this.state.title)
  //   this.handleCreateAlbum()
  // }
  //*****************************************************



  render() {
    // if (!this.state.isLoadedAlbums){
    //   return (<h3>Loading...</h3>)
    // }
    console.log("App.js-render", this.state.currentUser)
    return (
      <div className="App">
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" render={props=> <Login handleLogin={this.handleLogin} handleOnChange={this.handleOnChange} loginError={this.state.loginError} {...props}/>} />
      <Route path="/profile/:user_id" render={props=> <UserHome handleLogout={this.handleLogout} isLoadedAlbums={this.state.isLoadedAlbums} getToggleUpdate={this.getToggleUpdate} user={this.state.currentUser} {...props}/>} />
      <Route path="/signup" render={props=> <SignUp handleSignUp={this.handleSignUp} handleOnChange={this.handleOnChange} {...props}/>} />
      <Route path="/albums/:album_id" render={props=> <Album user={this.state.currentUser} isLoadedAlbums={this.state.isLoadedAlbums} {...props}/>} />
      </Switch>
      </div>
    );
  }
}

export default withRouter(App);

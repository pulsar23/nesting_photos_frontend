import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import CreateAlbum from './CreateAlbum.js';
import Album from './Album.js';


class UserHome extends Component{

  constructor(props) {
    super(props)
    this.state = {
      userID: this.props.match.params.user_id,
      albums: [],
      title: "",
      toggleUpdate: true
    }
  }//end constructor

  // componentDidMount(){
  //   this.getUserData();
  // }


  // getUserData = () =>{
  //   //let API_USER_ALBUMS = 'http://localhost:3000/api/v1/users/' + `${this.state.userID}` +'/albums'
  //   let API_USER_ALBUMS = 'http://localhost:3000/api/v1/albums'
  //   console.log(API_USER_ALBUMS)
  //   fetch(API_USER_ALBUMS,{
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${this.state.token}`
  //     }
  //   })//end fetch
  //     .then(resp => resp.json())
  //     .then(albums => this.setState({albums}))
  //     .then(albums => console.log(albums))
  // }


  handleCreateAlbum = () =>{
    console.log('handleCreateAlbum')
    let token = localStorage.token;
    let API_USER_ALBUMS = 'http://localhost:3000/api/v1/albums'
    console.log("token = ", token, "API_USER_ALBUMS = ", API_USER_ALBUMS)
    fetch(API_USER_ALBUMS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "title": `${this.state.title}`,
        "admin_id": `${this.state.userID}`
      })
    })//end fetch
    .then(resp => resp.json())
    .then(data => this.setState({toggleUpdate: !this.state.toggleUpdate}))
  }//end handleCreateAlbum

  handleAlbumSubmit = (event) =>{
    debugger
    event.preventDefault()
    console.log("handleAlbumSubmit",this.state.title)
    this.handleCreateAlbum()
  }

  handleOnChange = (event) =>{
    console.log("handleOnChange",event)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

   getAlbumInfo = (albums) => {
     console.log("In getAlbumInfo")
     console.log(albums)
     return albums.map((album) =>{
       return (
         <tr>
          <td><Link to={`/albums/${album.id}`} params={album.id, album.title}> {album.title} </Link></td>
          <td>{album.admin_id}</td>
          <td>{this.state.username}</td>
        </tr>
      )
    })
    }//end getAlbumInfo

    handleOnClick = (event) =>{
      debugger
      console.log("handleOnClick", event.target.textContent, event.target.dataset.id)
      //For handleLogout
    }

  render(){
    console.log("UserHome render", this.props)
    console.log("After getUserData")
  return(
    <div>
      <h1> Welcome {this.props.user.username} : {this.state.userID} Home Page </h1>
      <button onClick={()=>this.props.handleLogout(this.state.userID)}>Logout</button>
      <table>
        <tbody>
        <tr>
          <th>
          <CreateAlbum handleOnChange={this.handleOnChange} handleAlbumSubmit={this.handleAlbumSubmit}/>
          </th>
        </tr>
        <tr>
            <th><h3>Albums  </h3></th>
            <th><h3>Album Admin</h3></th>
            <th><h3>Shared Users</h3></th>
        </tr>
          {this.props.isLoadedAlbums
            ? this.getAlbumInfo(this.props.user.own_albums)
            : <h3>Loading...</h3>
            }
        </tbody>
      </table>
    </div>)
 }//end render
}//end class User

export default UserHome;

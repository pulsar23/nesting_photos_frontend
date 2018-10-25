import React, {Component} from 'react';
import AddPhoto from './AddPhoto.js'

class Album extends Component{

  state = {
    userID: this.props.user.id,   //Add userID information
    albumID: this.props.match.params.album_id,  //Add albumID information
    title: "",
    description: "",
    location: "",
    image_url: "",
    toggleUpdate: true
  }

  handleAddPhoto = () =>{
    debugger
    console.log('handleAddPhoto')
    let token = localStorage.token;
    let API_USER_PHOTOS = 'http://localhost:3000/api/v1/photos'
    console.log("token = ", token, "API_USER_PHOTOS = ", API_USER_PHOTOS)
    fetch(API_USER_PHOTOS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        "title": `${this.state.title}`,
        "description": `${this.state.description}`,
        "location": `${this.state.location}`,
        "image_url": `${this.state.image_url}`,
        "user_id": `${this.state.userID}`,
        "album_id": `${this.state.albumID}`
      })
    })//end fetch
    .then(resp => resp.json())
    .then(data => this.setState({toggleUpdate: !this.state.toggleUpdate}))
  }//end handleAddPhoto

  handlePhotoSubmit = (event) =>{
    debugger
    event.preventDefault()
    console.log("handlePhotoSubmit",this.state.title)
    this.handleAddPhoto()
  }

  handleOnChange = event =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }


  getPhotos = () =>{
      let pathname = this.props.location.pathname
      let albumID = parseInt(this.props.match.params.album_id)
      let selectedAlbum = this.props.user.own_albums.find((album) => album.id === albumID);
      console.log(selectedAlbum)
      return selectedAlbum.photos.map((photo)=>{
        console.log("----photos.map----", photo)
        return (
          <div key={photo.id}>
            <img key={photo.id} src={photo.image_url} width = "300" height = "300"></img>
            <h4>Title: {photo.title}</h4>
            <h4>Location: {photo.location}</h4>
            <h4>Description: {photo.description}</h4>
          </div>
        )
      })
    }//end getPhotos

  render(){
    console.log("this.state =", this.state)
    console.log("this.props = ", this.props)
    console.log("this.props.location.pathname = ", this.props.location.pathname)
    console.log("this.props.user", this.props.user)
    return(
      <div>
        <table>
          <tr><AddPhoto handleOnChange={this.handleOnChange} handlePhotoSubmit={this.handlePhotoSubmit}/></tr>
          <tr>--------------------------------</tr>
        </table>
        {this.props.isLoadedAlbums
          ? this.getPhotos()
          : <h3>Loading...</h3>
          }
      </div>
    )
  }
}

export default Album;

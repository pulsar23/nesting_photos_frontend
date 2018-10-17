import React from 'react';
import ReactDOM from 'react-dom';

const CreateAlbum = (props) => {
  return(
    <div>
    <h2> Add Album Details </h2>
      <form onSubmit={props.handleAlbumSubmit}>
        <div>
          <input type="text" name="title" placeholder="title" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default CreateAlbum;

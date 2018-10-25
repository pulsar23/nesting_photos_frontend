import React from 'react';

const CreateAlbum = (props) => {
  return(
    <div>
    <h3> Create New Album </h3>
      <form onSubmit={e => props.handleAlbumSubmit(e)}>
        <div>
          <input type="text" name="title" placeholder="title" onChange={e => props.handleOnChange(e)}/>
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default CreateAlbum;

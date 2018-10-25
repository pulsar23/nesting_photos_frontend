import React from 'react';
import ReactDOM from 'react-dom';

const AddPhoto = (props) => {
  return(
    <div>
    <h2> Add Photo </h2>
      <form onSubmit={(e)=>props.handlePhotoSubmit(e)}>
        <div><label>Title: </label>
          <input type="text" name="title" placeholder="title" onChange={e => props.handleOnChange(e)}/>
        </div>
        <div><label>Description: </label>
          <input type="text" name="description" placeholder="description" onChange={e => props.handleOnChange(e)}/>
        </div>
        <div><label>Location: </label>
          <input type="text" name="location" placeholder="location" onChange={e => props.handleOnChange(e)}/>
        </div>
        <div><label>image url: </label>
          <input type="text" name="image_url" placeholder="image_url" onChange={e => props.handleOnChange(e)}/>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default AddPhoto;

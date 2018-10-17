import React from 'react';
import ReactDOM from 'react-dom';

const AddPhoto = (props) => {
  return(
    <div>
    <h2> Add Photo Details </h2>
      <form onSubmit={props.handlePhotoSubmit}>
        <div>
          <input type="text" name="title" placeholder="title" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="text" name="description" placeholder="description" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="text" name="location" placeholder="location" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="text" name="image_url" placeholder="image_url" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="file" name="image_url" placeholder="image_url" onChange={props.handleOnChange}/>
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default AddPhoto;

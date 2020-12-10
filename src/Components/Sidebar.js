import React from 'react';
import PostForm from './PostForm.js';
import '../../public/Sidebar.css';

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <div>
        Filter By:{' '}
        <select name="filter" onChange={props.handleFilterSelect}>
          <option name="popular" value="popular">
            Popular
          </option>
          <option name="latest" value="latest">
            Latest
          </option>
        </select>
        <span className="underline">latest</span>
        <span className="underline"></span>
      </div>
      <button className="new-post-button" onClick={props.toggleForm}>
        + Add New Post
      </button>
      {props.formActive ? (
        <PostForm
          active={props.formActive}
          handleChange={props.handleInputChange}
          onClick={props.submitPost}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Sidebar;

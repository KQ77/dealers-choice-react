import React from 'react';
import PostForm from './PostForm.js';
import '../../public/Sidebar.css';

const Sidebar = (props) => {
  return (
    <div className="sidebar">
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

import React from 'react';
import '/public/PostForm.css';

const PostForm = (props) => {
  return (
    <div className={props.active === true ? 'active' : ''} id="createPost">
      <h2>Create New Post</h2>
      <div className="row">
        <label htmlFor="user-name">User Name</label>
        <input onChange={props.handleChange} id="user-name" name="userName" />
      </div>
      <select onChange={props.handleChange} name="category" id="category">
        <option value="">--select category--</option>
        <option value="questions">Q & A</option>
        <option value="animals">Animals</option>
        <option value="politics">Politics</option>
        <option value="random">Random</option>
        <option value="coding">Coding</option>
        <option value="funny">Funny</option>
        <option value="movies">Movies</option>
      </select>
      <label htmlFor="title">
        <span>* </span>title
      </label>
      <textarea
        onChange={props.handleChange}
        name="title"
        type="text"
        id="title"
      />
      <label htmlFor="text">Post</label>
      <textarea
        onChange={props.handleChange}
        name="text"
        type="text"
        placeholder="add details"
        id="text"
      />
      <button
        onClick={props.onClick}
        className="submit"
        type="submit"
        value="Submit"
      >
        Submit
      </button>
    </div>
  );
};

export default PostForm;

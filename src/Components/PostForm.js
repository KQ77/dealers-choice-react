import React from 'react';
import '/public/PostForm.css';

const PostForm = (props) => {
  return (
    <form id="creaetPost" method="POST" action="/api/posts">
      <h2>Create New Post</h2>
      <div className="row">
        <label htmlFor="user-name">User Name</label>
        <input id="user-name" name="user-name" />
      </div>
      <select name="category" id="category">
        <option value="">--select category--</option>
        <option value="questions">Q & A</option>
        <option value="politics">Politics</option>
        <option value="random">Random</option>
        <option value="coding">Coding</option>
        <option value="funny">Funny</option>
        <option value="movies">Movies</option>
      </select>
      <label htmlFor="title">
        <span>* </span>title
      </label>
      <textarea name="title" type="text" id="title" />
      <label htmlFor="text">Post</label>
      <textarea name="text" type="text" placeholder="add details" id="text" />
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
};

export default PostForm;

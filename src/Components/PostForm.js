import React from 'react';
import '../../public/PostForm.css';

const PostForm = (props) => {
  return (
    <div>
      <h2>Create New Post</h2>
      <div className="userName row">
        <label htmlFor="user-name">User Name</label>
        <input
          type="text"
          onChange={props.handleChange}
          id="user-name"
          name="userName"
        />
      </div>
      <select onChange={props.handleChange} name="category" id="category">
        <option value="">--select category--</option>
        {props.categories.map((cat, idx) => (
          <option kye={idx} value={cat}>
            {cat}
          </option>
        ))}
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
      <span className={props.error ? 'active red' : 'inactive red'}>
        * please fill out all fields
      </span>
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

import React from 'react';
import PostForm from './PostForm.js';
import '../../public/Sidebar.css';

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <div>
        Filter By Category{' '}
        <select name="filter" onChange={props.handleFilterSelect}>
          <option value="all">--show all--</option>
          {props.categories.map((cat, idx) => (
            <option key={idx} name={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button className="new-post-button" onClick={props.toggleForm}>
        + Add Post
      </button>
    </div>
  );
};

export default Sidebar;

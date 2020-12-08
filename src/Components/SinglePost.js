import React from 'react';
import '../../public/SinglePost.css';

const SinglePost = (props) => {
  const post = props.post;
  return (
    <>
      <div id="single-post" className="row">
        <div id="upvotes" className="column">
          <span>^</span>
          <span>{post.upvotes}</span>
          <span>v</span>
        </div>
        <div className="column">
          <p>
            {post.title} {post.time}
          </p>

          <p>{post.text}</p>
          <div className="row">
            <textarea type="text" placeholder="add a reply..." />
            <button>Reply</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePost;

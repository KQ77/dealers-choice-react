import React from 'react';

const SinglePost = (props) => {
  return (
    <>
      {props.posts.map((post, idx) => (
        <div key={idx}>
          <div>
            <span>^</span>
            <span>{post.upvotes}</span>
            <span>v</span>
          </div>
          <p>{post.subject}</p>
          <p>{post.text}</p>
        </div>
      ))}
    </>
  );
};

export default SinglePost;

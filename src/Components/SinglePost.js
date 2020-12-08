import React from 'react';

const SinglePost = (props) => {
  const post = props.post;
  return (
    <>
      <div>
        <div>
          <span>^</span>
          <span>{post.upvotes}</span>
          <span>v</span>
        </div>
        <p>{post.title}</p>
        <p>{post.text}</p>
        <p>{post.time}</p>
      </div>
      )
    </>
  );
};

export default SinglePost;

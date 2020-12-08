import React from 'react';

const PostList = (props) => {
  return (
    <>
      {props.posts.map((post) => (
        <SinglePost post={post} />
      ))}
    </>
  );
};

export default PostList;

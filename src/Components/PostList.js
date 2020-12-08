import React from 'react';
import SinglePost from './SinglePost';

const PostList = (props) => {
  return (
    <div>
      {props.posts.map((post, idx) => (
        <SinglePost
          downvote={props.downvote}
          upvote={props.upvote}
          key={idx}
          post={post}
        />
      ))}
    </div>
  );
};

export default PostList;

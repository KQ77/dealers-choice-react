import React from 'react';
import SinglePost from './SinglePost.js';

const PostList = (props) => {
  return (
    <>
      {props.posts.map((post, idx) => (
        <div key={idx}>
          <SinglePost
            showReplies={props.showReplies}
            toggleReplies={props.toggleReplies}
            addReply={() => props.addReply(post)}
            handleReplyChange={props.handleReplyChange}
            downvote={props.downvote}
            upvote={props.upvote}
            key={idx}
            post={post}
          />
        </div>
      ))}
    </>
  );
};

export default PostList;

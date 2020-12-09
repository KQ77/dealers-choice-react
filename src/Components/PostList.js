import React from 'react';
import SinglePost from './SinglePost.js';
import ReplyList from './ReplyList';

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
          <div className="column">
            {props.showReplies ? <ReplyList replies={post.replies} /> : ''}
          </div>
        </div>
      ))}
    </>
  );
};

export default PostList;

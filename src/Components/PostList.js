import React from 'react';
import SinglePost from './SinglePost.js';
import ReplyList from './ReplyList';

const PostList = (props) => {
  return (
    <>
      {props.posts.map((post, idx) => (
        <div key={idx}>
          <SinglePost
            handleReplyClick={props.handleReplyClick}
            addReply={() => props.addReply(post)}
            handleReplyChange={props.handleReplyChange}
            downvote={props.downvote}
            upvote={props.upvote}
            key={idx}
            post={post}
          />
          <div className="column">
            {props.selectedPost === post ? (
              <>
                <span
                  className="underline"
                  onClick={() => props.handleReplyClick(post)}
                >
                  collapse replies
                </span>
                <ReplyList replies={post.replies} />
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PostList;

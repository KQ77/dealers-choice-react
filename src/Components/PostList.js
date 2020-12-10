import React from 'react';
import SinglePost from './SinglePost.js';
import ReplyList from './ReplyList';

const PostList = (props) => {
  return (
    <>
      {props.posts.map((post, idx) => (
        <div key={idx}>
          <SinglePost
            collapse={props.collapse}
            deletePost={props.deletePost}
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
              <ReplyList
                removeReply={props.removeReply}
                collapse={props.collapse}
                handleReplyClick={props.handleReplyClick}
                post={post}
                replies={post.replies}
              />
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

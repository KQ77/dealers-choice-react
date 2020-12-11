import React from 'react';
import SinglePost from './SinglePost.js';
import ReplyList from './ReplyList';

const PostList = (props) => {
  let posts = props.posts;

  if (props.filter !== 'all') {
    posts = posts
      .filter((post) => post.category === props.filter)
      .sort((a, b) => b.upvotes - a.upvotes);
  }

  return (
    <>
      {posts.map((post, idx) => (
        <div key={idx}>
          <SinglePost
            selectedPostId={props.selectedPostId}
            replyFormData={props.replyFormData}
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
          {!!props.selectedPost.id ? (
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
          ) : (
            ''
          )}
        </div>
      ))}
    </>
  );
};

export default PostList;

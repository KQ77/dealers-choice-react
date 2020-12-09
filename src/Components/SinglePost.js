import React from 'react';
import '../../public/SinglePost.css';
import ReplyList from './ReplyList';

const SinglePost = (props) => {
  const post = props.post;

  return (
    <>
      <div id="single-post" className="row">
        <div id="upvotes" className="column">
          <span onClick={() => props.upvote(post)}>^</span>
          <p>{post.upvotes}</p>
          <span onClick={() => props.downvote(post)}>v</span>
        </div>
        <div className="post-details column">
          <p className="title">
            {post.title}{' '}
            <small>
              <span> by {post.userName} </span>
              <span className="italic">{post.time} </span>
            </small>
          </p>

          <p>{post.text}</p>
          <textarea
            onChange={props.handleReplyChange}
            type="text"
            placeholder="add a reply..."
          />
          <button id="reply-button" onClick={() => props.addReply(post)}>
            Reply
          </button>
          <span onClick={props.toggleReplies} className="underline">
            replies
          </span>
        </div>
      </div>
    </>
  );
};

export default SinglePost;

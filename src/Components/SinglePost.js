import React from 'react';
import '../../public/SinglePost.css';

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
          <p className="title">Title: {post.title} </p>

          <div className="row">
            <p className="category">
              <span>{post.category}</span>
            </p>
            <small>
              <span className="time italic">submitted {post.time}</span>
              <span> by {post.userName} </span>
            </small>
          </div>

          <p className="text">{post.text}</p>
          <textarea
            id={post.id} //5
            value={
              props.selectedPostId * 1 === post.id ? props.replyFormData : ''
            }
            onChange={props.handleReplyChange}
            type="text"
            placeholder="add a reply..."
          />
          <button id="reply-button" onClick={() => props.addReply(post)}>
            Reply
          </button>
          <span
            onClick={() => props.handleReplyClick(post)}
            className="underline"
          >
            replies ({post.replies.length})
          </span>
        </div>
        <div className="delete-button">
          <button
            className="delete-button"
            onClick={() => props.deletePost(post)}
          >
            Delete Post
          </button>
        </div>
      </div>
    </>
  );
};

export default SinglePost;

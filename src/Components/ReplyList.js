import React from 'react';
import SingleReply from './SingleReply';
import '../../public/ReplyList.css';

function ReplyList(props) {
  return (
    <div id="reply-list">
      <button className="collapse" onClick={props.collapse}>
        collapse replies
      </button>
      {props.replies.map((reply, idx) => (
        <div key={idx} id="single-reply">
          <SingleReply reply={reply} />
        </div>
      ))}
    </div>
  );
}

export default ReplyList;

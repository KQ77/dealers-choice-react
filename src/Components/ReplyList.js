import React from 'react';
import SingleReply from './SingleReply';
import '../../public/ReplyList.css';

function ReplyList(props) {
  return (
    <div id="reply-list">
      <span className="collapse" onClick={props.collapse}>
        [- collapse ]
      </span>
      {props.replies.map((reply, idx) => (
        <div id="reply" key={idx}>
          <SingleReply reply={reply} />
          <button onClick={() => props.removeReply(reply)}> - remove</button>
        </div>
      ))}
    </div>
  );
}

export default ReplyList;

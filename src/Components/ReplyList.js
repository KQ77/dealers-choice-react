import React from 'react';
import SingleReply from './SingleReply';
import '../../public/ReplyList.css';

function ReplyList(props) {
  return (
    <div id="reply-list">
      {props.replies.map((reply, idx) => (
        <SingleReply key={idx} reply={reply} />
      ))}
    </div>
  );
}

export default ReplyList;

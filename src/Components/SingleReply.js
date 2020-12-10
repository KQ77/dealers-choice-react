import React from 'react';
import '../../public/SingleReply.css';

const SingleReply = (props) => {
  return (
    <div id="single-reply">
      <p>{props.reply.text}</p>
    </div>
  );
};

export default SingleReply;

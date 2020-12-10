import React from 'react';
import '../../public/SingleReply.css';

const SingleReply = (props) => {
  return (
    <>
      <p>{props.reply.text}</p>
      <button onClick={props.removeReply}> -</button>
    </>
  );
};

export default SingleReply;

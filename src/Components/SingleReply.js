import React from 'react';
import '../../public/SingleReply.css';

const SingleReply = (props) => {
  return <p>{props.reply.text}</p>;
};

export default SingleReply;

import React from 'react';

const Message = ({ type, message }) => {
  return (
    <div className={type}>
      <h3>{message}</h3>
    </div>
  );
};

export default Message;

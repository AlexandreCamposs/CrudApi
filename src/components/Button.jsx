import React from 'react';

const Button = ({ onClick, children, value }) => {
  return (
    <button onClick={onClick} className={value}>
      {children}
    </button>
  );
};

export default Button;

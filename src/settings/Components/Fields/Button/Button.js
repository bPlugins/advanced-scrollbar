import React from 'react';
import "./style.scss";
const Button = ({ children, variant = "primary", ...rest }) => {
  return (
    <button className={`bPl-button ${variant}`} {...rest}>{children}</button>
  );
};

export default Button;
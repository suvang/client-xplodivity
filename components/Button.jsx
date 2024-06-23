import React from "react";

const Button = (props) => {
  const {
    onClick,
    type = "btn-accent",
    text,
    customStyles = "",
    children,
    className,
  } = props;
  return (
    <button
      className={`btn ${type} ${customStyles} ${className}`}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};

export default Button;

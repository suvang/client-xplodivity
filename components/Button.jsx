import React from "react";

const Button = () => {
  const { onClick, type = "btn-accent", text, customStyles = "" } = props;
  return (
    <button className={`btn ${type} ${customStyles}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

import React from "react";

function Button({ onClick, message }) {
  return (
    <button
      className="welcomemodal-button"
      onClick={() => {
        onClick();
      }}
    >
      {message}
    </button>
  );
}

export default Button;

import React from "react";

function Button({ onClick, message, color }) {
  return (
    <button
      className={`Button ${color}`}
      onClick={() => {
        onClick();
      }}
    >
      {message}
    </button>
  );
}

export default Button;

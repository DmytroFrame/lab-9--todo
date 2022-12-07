import React from "react";
import "./TodoNavbar.scss";

export default function TodoNavbar({ onClick, authState, keyState}) {
  return (
    <div className="navbar">
      <button onClick={onClick}>📝</button>
      <button
        onClick={() => {
          localStorage.setItem("token", "");
          authState(false)
        }}
      >
        🚪
      </button>
      <button
        onClick={() => {
          localStorage.setItem("isActivate", "false");
          localStorage.setItem("activateKey", "");
          keyState(false);
        }}
      >
        🔑
      </button>


    </div>
  );
}

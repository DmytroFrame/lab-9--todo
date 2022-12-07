import React from "react";
import "./Input.scss";

export default function Input({ type = "text", setState, placeholder }) {
  return (
    <div className="custom-input">
      <input type={type} onChange={({ target }) => setState(target.value)} placeholder={placeholder}/>
    </div>
  );
}

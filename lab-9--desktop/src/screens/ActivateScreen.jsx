import React, { useState } from "react";
import "./ActivateScreen.scss";
import axios from "axios";
import { invoke } from "@tauri-apps/api/tauri";

export default function ActivateScreen({ setState }) {
  const [text, setText] = useState("Введіть ваш ліцензійний ключ");
  const [value, setValue] = useState("");

  function sendMessage(msg) {
    setText(msg);
    setTimeout(() => {
      setText("Введіть ваш ліцензійний ключ");
    }, 4000);
  }

  async function activate() {
    if (value === "") return sendMessage("Ви не написали ключ");
    axios
      .post("http://localhost:7000/api/license-keys/can-activated", {
        envSpec: await invoke("get_mac_addr"),
        key: value,
      })
      .then((_) => {
        localStorage.setItem("activateKey", value);
        localStorage.setItem("isActivate", "true");
        setState(true);
      })
      .catch((_) => sendMessage("Ключ не вірний"));
  }

  return (
    <div className="activate-container">
      <div className="activate-block">
        <h2>{text}</h2>
        <div className="activate-input">
          <input
            type="text"
            autoComplete="off"
            onChange={({ target }) => setValue(target.value)}
          />
        </div>
        <button onClick={activate}>Активувати</button>
      </div>
    </div>
  );
}

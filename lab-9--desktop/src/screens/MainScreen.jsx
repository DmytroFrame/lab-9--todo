import React, { useState } from "react";
import ActivateScreen from "./ActivateScreen";
import AuthScreen from "./AuthScreen";
import axios from "axios";
import TodoScreen from "./TodoScreen";
import { invoke } from "@tauri-apps/api/tauri";

export default function MainScreen() {
  const [isActivate, setActivate] = useState(
    localStorage.getItem("isActivate") === "true"
  );
  const [isAuth, setAuth] = useState(localStorage.getItem("token"));

  async function checkActivate() {
    axios
      .post("http://localhost:7000/api/license-keys/can-activated", {
        envSpec: await invoke("get_mac_addr"),
        key: localStorage.getItem("activateKey"),
      })
      .then((_) => {
        localStorage.setItem("isActivate", "true");
        setActivate(true);
      })
      .catch((_) => {
        localStorage.setItem("isActivate", "false");
        setActivate(false);
      });
  }
  React.useEffect(() => {
    checkActivate();
  }, []);

  if (!isActivate) return <ActivateScreen setState={setActivate} />;
  if (!isAuth) return <AuthScreen setState={setAuth} />;
  return <TodoScreen authState={setAuth} keyState={setActivate} />;
}

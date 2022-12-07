import React, { useState } from "react";
import Input from "../components/Input";
import "./AuthScreen.scss";
import axios from "axios";

export default function AuthScreen({ setState }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [text, setText] = useState("");

    function sendMessage(msg) {
        setText(msg)
        setTimeout(() => {
            setText("");
          }, 4000);
    }


  async function login() {
    const req = await axios.post("http://localhost:7000/api/auth/login", {
      email,
      password,
    }, {validateStatus: () => true});
    if (req.status !== 201) {
        return sendMessage('Даній не вірні')
    }
    localStorage.setItem('token', req.data.token)
    setState(true)
  }

  return (
    <div className="auth-container">
      <div className="auth-block">
        <h1>lab9</h1>
        {text && <h4>{text}</h4>}
        <Input setState={setEmail} placeholder="Email" />
        <br />
        <Input setState={setPassword} type="password" placeholder="Пароль" />
        <br />
        <div className="auth-btn">
          <button className="btn" onClick={() => {login()}}>Увійти</button>
          <button className="btn" onClick={() => {sendMessage("Ще не працює :)")}}>Рейстрація</button>
        </div>
        <br />
        <br />
      </div>

     
    </div>
  );
}

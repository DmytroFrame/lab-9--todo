import React, {useState} from "react";
import "./TodoMenu.scss";
import Input from "../Input";
import axios from "axios";

export default function TodoMenu({menuState}) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  async function saveTodo() {
    if (title === "") return;
    await axios.post(
      "http://localhost:7000/api/todos",
      { name: title, text },
      { headers: { authorization: "Bearer " + localStorage.getItem("token") }, validateStatus: () => true }
    );
    menuState(false)
  }

  return (
    <div className="todo-menu">
      <h2>New Todo</h2>
      <br />
      <Input placeholder={"Заголовок"} setState={setTitle} />
      <br />
      <Input placeholder={"Текст"} setState={setText} />
      <br />
      <div>
        <button
          onClick={() => {
            saveTodo();
          }}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
}

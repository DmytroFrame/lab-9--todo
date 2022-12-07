import React, { useState, useEffect } from "react";
import TodoCard from "../components/todo-card/TodoCard";
import TodoMenu from "../components/todo-menu/TodoMenu";
import TodoNavbar from "../components/todo-navbar/TodoNavbar";
import "./TodoScreen.scss";
import axios from "axios";

export default function TodoScreen({ authState, keyState }) {
  const [isOpenMenu, setOpenMenu] = useState(false);
  const [todos, setTodos] = useState([]);

  async function fetchTodos() {
    const req = await axios.get("http://localhost:7000/api/todos", {
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      validateStatus: () => true,
    });
    if (req.status !== 200) {
      localStorage.setItem("token", "");
      return;
    }
    setTodos(req.data);
  }
  useEffect(() => {
    setInterval(() => {
      fetchTodos();
    }, 1000);
  });

  if (isOpenMenu)
    return (
      <div className="todo-screen-container">
        <TodoNavbar
          authState={authState}
          keyState={keyState}
          onClick={() => {
            setOpenMenu(!isOpenMenu);
          }}
        />
        <div className="todos">
          <TodoMenu menuState={setOpenMenu} />
        </div>
      </div>
    );

  return (
    <div className="todo-screen-container">
      <TodoNavbar
        authState={authState}
        keyState={keyState}
        onClick={() => {
          setOpenMenu(!isOpenMenu);
        }}
      />
      <div className="todos">
        {todos.map((todo) => (
          <TodoCard todo={todo} key={todo.id} setState={setOpenMenu} />
        ))}
      </div>
    </div>
  );
}

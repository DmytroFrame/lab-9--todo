import React from "react";
import "./TodoCard.scss";
import axios from "axios";

export default function TodoCard({ todo, setState, fetchTodos }) {
  async function deleteTodo() {
    await axios.delete(`http://localhost:7000/api/todos/${todo.id}`, {
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      validateStatus: () => true,
    });
    setState(false);
    fetchTodos()
  }

  return (
    <div className="todo-card">
      <h4>{todo.name}</h4>
      <p>{todo.text}</p>
      <button
        onClick={() => {
          deleteTodo();
        }}
      >
        Видалити
      </button>
    </div>
  );
}

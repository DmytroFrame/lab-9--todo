import React, {useEffect, useState} from "react";
import TodoCard from "../components/todo-card/TodoCard";
import axios from "axios";

export default function Todos({setOpenMenu}) {
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
    fetchTodos();
  }, []);

  return todos.map((todo) => (
    <TodoCard todo={todo} key={todo.id} setState={setOpenMenu} fetchTodos={fetchTodos} />
  ));
}

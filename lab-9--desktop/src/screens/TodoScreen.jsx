import React, { useState, useEffect } from "react";

import TodoMenu from "../components/todo-menu/TodoMenu";
import TodoNavbar from "../components/todo-navbar/TodoNavbar";
import "./TodoScreen.scss";
import Todos from "../components/Todos";

export default function TodoScreen({ authState, keyState }) {
  const [isOpenMenu, setOpenMenu] = useState(false);

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
        <Todos setOpenMenu={setOpenMenu} />
      </div>
    </div>
  );
}

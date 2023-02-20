import React from "react";
import todo from "./todo"
export default function todoList({ todos, toggleTodo, className }) {
  return todos.map((todo) => {
    return (
      <todo
        key={todo.id}
        toggleTodo={toggleTodo}
        todo={todo}
        className={className}
      />
    );
  });
}

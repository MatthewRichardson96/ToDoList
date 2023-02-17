import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <div className=" container bg-gray-200 rounded-xl shadow border p-8 m-10 mx-auto items-center">
        <div className="flex justify-center">
          <p className="text-3xl text-gray-700 font-bold">To Do App!</p>
        </div>
        <div className="flex justify-evenly mt-5">
          <div className="justify-center">
            <p className="font-semibold text-lg mt-5">
              Add your items to do 🥳
            </p>
            <input className="mt-6" ref={todoNameRef} type="text" />
            <button
              className="ml-3 bg-blue-400 rounded-xl w-28"
              onClick={handleAddTodo}
            >
              Add Todo
            </button>
          </div>
          <div className="justify-center mt-5">
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <button
              onClick={handleClearTodos}
              className="bg-blue-400 w-36 rounded-xl mt-2"
            >
              Clear Complete
            </button>
            <div className="bg-green-300 w-36 rounded-sm mt-2 flex justify-center">
              {todos.filter((todo) => !todo.complete).length} left to do
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

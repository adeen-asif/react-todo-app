import React, { useEffect, useRef, useState } from "react";
import TodoIcon from "../assets/todo-icon.jpg";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }
    // console.log(inputText);
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodoList(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-blue-100 w-11/12 max-w-md mx-auto flex flex-col p-7 min-h-[500px] rounded-xl mt-10 shadow-md">
      <div className="flex items-center mt-7 gap-4 mb-8">
        <img
          src={TodoIcon}
          alt="Todo-icon"
          className="w-12 h-12 rounded-full  border-2 border-blue-900"
        />
        <h1
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
          className="text-3xl font-semibold text-gray-900 tracking-tight leading-none"
        >
          ToDo List
        </h1>
      </div>
      <div className="flex items-center my-4 bg-white rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              add();
            }
          }}
        />
        <button
          onClick={add}
          className="rounded-full border-none bg-slate-600 w-24 h-12 text-white text-lg font-extrabold cursor-pointer  hover:bg-slate-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          +
        </button>
      </div>
      <div>
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={item.id}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggleComplete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;

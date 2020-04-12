import React from "react";
import "./App.css";
import ListTodos from "./components/ListTodos";
import InputTodo from "./components/InputTodo";

function App() {
  return (
    <>
      <InputTodo />
      <ListTodos />
    </>
  );
}

export default App;

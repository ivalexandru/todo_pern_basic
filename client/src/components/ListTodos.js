import React, { Fragment, useState, useEffect } from "react";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState(false);

  //delete todo
  async function deleteTodo(id) {
    try {
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      //daca nu faci asta, tre sa dai refresh in browser ca sa vezi ca s-au sters:
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getTodos() {
    //DEFAULT, fetch does a GET request
    const res = await fetch("http://localhost:5000/todos");

    //we're going to get back json data, so we need to parse it:
    //await, pt ca dureaza ceva to parse
    const todoArray = await res.json();

    setTodos(todoArray);
  }
  useEffect(() => {
    getTodos();
  }, [todos]);

  function toggleCompleted() {
    if (completed) {
      setCompleted(false);
    } else {
      setCompleted(true);
    }
  }

  return (
    <Fragment>
      <table className="table mt-5">
        <thead>
          <tr>
            <th>Todo id</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Completed</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              <td>edit todo</td>
              <td>
                <input
                  name={todo.todo_id}
                  type="checkbox"
                  onClick={toggleCompleted}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;

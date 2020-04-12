import React, { Fragment, useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const completed = false;
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description, completed };

      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">input todo</h1>
      {/* ai sa trimiti date, deci ai nevoie de form */}
      <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <button className="btn btn-success">ADD</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config/db");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" }); //point to the file

//middleware:
app.use(cors());
app.use(express.json()); // => allows us to access data from client side with req.body

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.status(200).json(allTodos.rows);
    // res.status(200).json(allTodos.fields);
  } catch (err) {
    console.error(err.message);
  }
});

//create a todo
app.post("/todos", async (req, res) => {
  try {
    //member that we get data from client by req.body:
    //aka ce pui in postman momentan, va fi bagat in var description
    const { description, completed } = req.body;

    //todo e numele tabelului din db
    const newTodo = await pool.query(
      "insert into todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// //get a specific todo
// app.get("/todos/:id", async (req, res) => {
//   try {
//     //  console.log(req.params);
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json(todo.rows[0]);
//   } catch (err) {
//     console.err(err.message);
//   }
// });

// //update todo:
// app.put("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateTodo = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2",
//       [description, id]
//     );
//     res.json("the todo was updated");
//   } catch (err) {}
// });

//delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    // const id = req.params.id
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
}); // to delete id 1, in postman do: localhost:5000/todos/1

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is starting on port ${PORT}`);
});

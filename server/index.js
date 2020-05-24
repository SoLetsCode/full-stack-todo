//used to hide passwords and database info
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = 5000;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const getTodo = await pool.query(
      `SELECT * FROM todo WHERE todo_id = ${req.params.id}`
    );
    res.json(getTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const updateTodo = await pool.query(
      `UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *`,
      [req.body.description, req.params.id]
    );
    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const deleteTodo = await pool.query(
      `DELETE FROM todo WHERE todo_id = ${req.params.id} RETURNING *`
    );
    !deleteTodo.rows[0] //checking for null. Null is falsy in JS.
      ? res.json({ message: "todo not found" })
      : res.json(deleteTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});

import React from "react";
import EditTodo from "./EditTodo";

export default function ListTodo({ list, fetchData }) {
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      fetchData();
      deleteTodo.json().then((data) => console.log(data));
    } catch (error) {
      console.error(error.message);
    }
  };
  let myList = list.map((data) => {
    return (
      <tr key={data.todo_id}>
        <td>{data.description}</td>
        <td>
          <EditTodo todo={data} fetchData={fetchData} />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteTodo(data.todo_id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{myList}</tbody>
      </table>
    </div>
  );
}

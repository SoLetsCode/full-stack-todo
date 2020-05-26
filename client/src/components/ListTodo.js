import React from "react";

export default function ListTodo({ list, fetchData }) {
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      fetchData();
      console.log(deleteTodo);
    } catch (error) {
      console.error(error.message);
    }
  };
  let myList = list.map((data) => {
    return (
      <tr key={data.todo_id}>
        <td>{data.description}</td>
        <td>Edit</td>
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

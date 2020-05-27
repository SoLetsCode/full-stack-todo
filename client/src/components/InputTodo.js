import React, { useState } from "react";

export default function InputTodo({ fetchData }) {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    e.target.reset();

    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response.json());
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Input Todo</h1>
      <form className="d-flex mt-5" id="myForm" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
}

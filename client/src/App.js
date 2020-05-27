import React, { useState, useEffect } from "react";
import "./styles/App.css";

//components
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";

function App() {
  const [list, setList] = useState();

  const fetchData = async () => {
    const result = await fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => data);
    setList(result);
  };

  //grab information from database
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <InputTodo fetchData={fetchData} />
        {!list ? (
          <h1>LOADING...</h1>
        ) : (
          <ListTodo list={list} fetchData={fetchData} />
        )}
      </div>
    </div>
  );
}

export default App;

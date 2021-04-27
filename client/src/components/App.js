import React from "react";
import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage"

function App() {
  const [id, setId] = useLocalStorage('id');

  return (
    <>
      {id}
      <Login onIdSubmit={setId} />
    </>
  );
}

export default App;

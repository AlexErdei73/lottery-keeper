import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({});

  /* Little opening animation */
  useEffect(() => {
    setTimeout(() => {
      const titleNode = document.querySelector(".app");
      titleNode.classList.add("show");
    }, 0);
  }, []);

  return (
    <div className="app">
      <h1>Lottery Keeper</h1>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import "./App.css";
import lottoPic from "./assets/images/lotteryticket.avif";

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
      <img className="landing-img" src={lottoPic} alt="lottery ticket image" />
    </div>
  );
}

export default App;

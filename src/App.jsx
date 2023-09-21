import { useState, useEffect } from "react";
import "./App.css";
import lottoPic from "./assets/images/lotteryticket.avif";
import Modal from "./components/Modal";

function App() {
  const [state, setState] = useState({
    isPlayer: false,
    isOperator: false,
  });

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  /* Little opening animation */
  useEffect(() => {
    setTimeout(() => {
      const appNode = document.querySelector(".app");
      appNode.classList.add("show");
    }, 0);
    const interval = setInterval(() => {
      const titleNode = document.querySelector("h1");
      titleNode.classList.toggle("color-change");
    }, 1000);
  }, []);

  const openingPage = (
    <div className="app">
      <h1>Lotto Keeper</h1>
      <div className="img-container">
        <img
          className="landing-img"
          src={lottoPic}
          alt="lottery ticket image"
        />
      </div>
      <button type="button" onClick={() => setOpenModal(true)}>
        Entrance
      </button>
      <Modal
        openModal={openModal}
        closeModal={closeModal}
        headerText="Question"
      >
        Which character are you playing?
        <div className="buttons">
          <button>Player</button>
          <button>Operator</button>
        </div>
      </Modal>
    </div>
  );

  return <>{openingPage}</>;
}

export default App;

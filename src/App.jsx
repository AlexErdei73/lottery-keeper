import { useState, useEffect } from "react";
import "./App.css";
import lottoPic from "./assets/images/lotteryticket.avif";
import Modal from "./components/Modal";

function App() {
  const [state, setState] = useState({});

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => setOpenModal(false);

  /* Little opening animation */
  useEffect(() => {
    setTimeout(() => {
      const appNode = document.querySelector(".app");
      appNode.classList.add("show");
    }, 0);
    setInterval(() => {
      const titleNode = document.querySelector("h1");
      titleNode.classList.toggle("color-change");
    }, 600);
  }, []);

  return (
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
      <Modal openModal={openModal} closeModal={closeModal}>
        This is my modal.
      </Modal>
    </div>
  );
}

export default App;

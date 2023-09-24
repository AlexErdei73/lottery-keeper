import { useState, useEffect, useRef } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Player from "./components/Player";
import Operator from "./components/Operator";
import GameImage from "./components/GameImage";

function App() {
  const INITIAL_STATE = {
    player: {
      name: "Player",
      balance: 10000,
    },
    operator: {
      balance: 0,
    },
    draws: [],
    games: [],
  };
  const [state, setState] = useState(INITIAL_STATE);

  const [page, setPage] = useState("opening");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("state");
    if (!savedState) return;
    setState(JSON.parse(savedState));
  }, []);

  useEffect(() => {
    const stateString = JSON.stringify(state);
    if (stateString === JSON.stringify(INITIAL_STATE)) return;
    localStorage.setItem("state", stateString);
  }, [state]);

  const closeModal = () => setOpenModal(false);

  const handlePlayerClick = () => setPage("player");
  const handleOperatorClick = () => setPage("operator");
  const handleBackClick = () => setPage("opening");

  /* Little opening animation */
  const appNode = useRef();
  useEffect(() => {
    setTimeout(() => {
      appNode.current.classList.add("show");
    }, 0);
  }, []);

  const openingPage = (
    <>
      <h1 className="color-change">Lotto Keeper</h1>
      <GameImage />
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
          <button type="button" onClick={handlePlayerClick}>
            Player
          </button>
          <button type="button" onClick={handleOperatorClick}>
            Operator
          </button>
        </div>
      </Modal>
    </>
  );

  return (
    <div className="app" ref={appNode}>
      {page === "opening" && openingPage}
      {page === "player" && (
        <Player
          state={state}
          setState={setState}
          goBack={handleBackClick}
        ></Player>
      )}
      {page === "operator" && (
        <Operator state={state} goBack={handleBackClick}></Operator>
      )}
    </div>
  );
}

export default App;

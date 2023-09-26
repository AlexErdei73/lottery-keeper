import { useState, useEffect, useRef } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Player from "./components/Player";
import Operator from "./components/Operator";
import GameImage from "./components/GameImage";
import { INITIAL_STATE } from "./helper";

function App() {
  const [state, setState] = useState(INITIAL_STATE);

  const [page, setPage] = useState("opening");
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("state");
    if (!savedState) return;
    setState(JSON.parse(savedState));
  }, []);

  useEffect(() => {
    const stateString = JSON.stringify(state);
    if (stateString === JSON.stringify(INITIAL_STATE)) return;
    try {
      localStorage.setItem("state", stateString);
    } catch (error) {
      console.error(error);
      setOpenErrorModal(true);
    }
  }, [state]);

  const closeModal = () => setOpenModal(false);
  const closeErrorModal = () => setOpenErrorModal(false);

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
        <Operator
          state={state}
          setState={setState}
          goBack={handleBackClick}
        ></Operator>
      )}

      <Modal
        openModal={openErrorModal}
        closeModal={closeErrorModal}
        headerText="Storage Error"
      >
        <p>
          The local storage cannot store more data! Please reset the app to keep
          playing and able to save the app data in the browser.
        </p>
        <button type="button" onClick={closeErrorModal}>
          OK
        </button>
      </Modal>
    </div>
  );
}

export default App;

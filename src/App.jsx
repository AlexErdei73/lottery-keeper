import { useState, useEffect, useRef } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Player from "./components/Player";
import Operator from "./components/Operator";
import GameImage from "./components/GameImage";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
  const mainNode = useRef();
  useEffect(() => {
    if (!mainNode.current) return;
    setTimeout(() => {
      mainNode.current.classList.add("show");
    }, 0);
  });

  const openingPage = (
    <>
      <Header />
      <main ref={mainNode}>
        <p>
          It is a lottery simulation game. As a player you start with 10000
          credits and you can buy game tickets. You may make profit if you win.
          As an operator you start with 0 credits and you trigger the draw. You
          also can simulate game tickets by the computer and keep the profit.
          Your goal is to make credit in both case.
        </p>
        <GameImage />
        <button type="button" onClick={() => setOpenModal(true)}>
          Entrance
        </button>
        <div className="footer-info">
          <span>&copy;</span> 2023 - Alex Erdei{" "}
          <a href="https://github.com/AlexErdei73/lottery-keeper">
            Code on GitHub
          </a>
        </div>
      </main>
      <Footer />
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
    <div className="app">
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

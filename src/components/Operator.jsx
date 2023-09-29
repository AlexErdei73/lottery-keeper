import { useState } from "react";
import Header from "./Header";
import GameImage from "./GameImage";
import Modal from "./Modal";
import Tickets from "./Tickets";
import Footer from "./Footer";
import DrawInfoModal from "./DrawInfoModal";
import { draw, simulateGames, getWinningNumbers } from "../gamelogic/operator";
import { INITIAL_STATE } from "../helper";
import "./operator.css";

const Operator = ({ state, setState, goBack }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openSimuModal, setOpenSimuModal] = useState(false);
  const [showTickets, setShowTickets] = useState(false);

  const closeModal = () => setOpenModal(false);
  const closeSimuModal = () => setOpenSimuModal(false);

  const handleDrawClick = () => {
    draw(state, setState, getWinningNumbers());
    setOpenModal(true);
  };

  const handleSimuClick = () => setOpenSimuModal(true);

  const handleSubmitGameNumber = (event) => {
    event.preventDefault();
    const numberOfGames = event.target[0].value;
    simulateGames(state, setState, numberOfGames);
    closeSimuModal();
  };

  const handleTicketsClick = () => setShowTickets(true);
  const showOperatorPage = () => setShowTickets(false);
  const handleResetClick = () => {
    window.localStorage.removeItem("state");
    setState(INITIAL_STATE);
    goBack();
  };

  return (
    <>
      <Header role={state.operator} />
      {!showTickets && (
        <>
          <main className="show">
            <div className="buttons">
              <button type="button" onClick={handleDrawClick}>
                Draw
              </button>
              <button type="button" onClick={handleSimuClick}>
                Simulation
              </button>
              <button type="button" onClick={handleTicketsClick}>
                Tickets
              </button>
              <button type="button" onClick={handleResetClick}>
                Reset
              </button>
              <button type="button" onClick={goBack}>
                Back
              </button>
            </div>
            <GameImage />
          </main>
          <Footer />
        </>
      )}
      {showTickets && (
        <>
          <main className="show">
            <Tickets
              state={state}
              goBack={showOperatorPage}
              option="operator"
            />
          </main>
          <Footer />
        </>
      )}

      <DrawInfoModal
        state={state}
        drawIndex={state.draws.length - 1}
        openModal={openModal}
        closeModal={closeModal}
        option="operator"
      />

      <Modal
        openModal={openSimuModal}
        closeModal={closeSimuModal}
        headerText="Simulate Players"
      >
        <p>How many games do you want to generate?</p>
        <form onSubmit={handleSubmitGameNumber}>
          <div className="form-input">
            <label htmlFor="number">Number:*</label>
            <input
              type="number"
              min="1"
              max="10000"
              id="number"
              defaultValue="1"
            />
          </div>
          <div className="buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={closeSimuModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Operator;

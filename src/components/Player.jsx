import { useState } from "react";
import Modal from "./Modal";
import GameImage from "./GameImage";
import Tickets from "./Tickets";
import Header from "./Header";
import Footer from "./Footer";
import { areNumbersValid } from "../gamelogic/general";
import { submitNumbers } from "../gamelogic/player";
import "./player.css"; // Updated CSS file

const Player = ({ state, setState, goBack }) => {
  const NUMBERS_ERROR = "Different numbers are required!";

  const LOW_CREDIT_ERROR = "Your credit is too low to play!";

  const NUMBERS_MSG =
    "Choose 5 different numbers between 1 and 39. The game costs 500 credits.";

  const [openNameModal, setOpenNameModal] = useState(false);

  const [numbersModal, setNumbersModal] = useState({
    open: false,

    msg: NUMBERS_MSG,
  });

  const [showTickets, setShowTickets] = useState(false);
  const [name, setName] = useState(state.player.name);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const handleNameClick = () => setOpenNameModal(true);

  const closeNameModal = () => setOpenNameModal(false);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    const newState = { ...state };
    newState.player.name = name;
    setState(newState);
    closeNameModal();
  };

  const handleGameClick = () =>
    setNumbersModal({ open: true, msg: numbersModal.msg });

  const closeNumbersModal = () =>
    setNumbersModal({ open: false, msg: NUMBERS_MSG });

  const handleNumbersSubmit = (event) => {
    event.preventDefault();

    if (!areNumbersValid(selectedNumbers)) {
      setNumbersModal({
        open: true,
        msg: NUMBERS_ERROR,
      });

      return;
    }

    if (state.player.credit < 500) {
      setNumbersModal({
        open: true,
        msg: LOW_CREDIT_ERROR,
      });

      return;
    }

    submitNumbers(selectedNumbers, state, setState);

    closeNumbersModal();

    setSelectedNumbers([]); // Reset selection after submission
  };

  const handleTicketsClick = () => setShowTickets(true);

  const showPlayersPage = () => setShowTickets(false);

  const toggleNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      if (selectedNumbers.length < 5) {
        setSelectedNumbers([...selectedNumbers, number]);
      }
    }
  };

  const renderNumberButtons = () => {
    const numbers = Array.from({ length: 39 }, (_, i) => i + 1);

    return (
      <div className='number-buttons'>
        {numbers.map((number) => (
          <button
            key={number}
            type='button'
            className={`number-button ${
              selectedNumbers.includes(number) ? "selected" : ""
            }`}
            onClick={() => toggleNumber(number)}
            disabled={
              !selectedNumbers.includes(number) && selectedNumbers.length >= 5
            }
          >
            {number}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header role={state.player} />

      {!showTickets && (
        <>
          <main className='show'>
            <div className='buttons'>
              <button type='button' onClick={handleNameClick}>
                Name
              </button>

              <button type='button' onClick={handleGameClick}>
                Game
              </button>

              <button
                type='button'
                onClick={handleTicketsClick}
                disabled={state.games.length === 0}
              >
                Tickets
              </button>

              <button type='button' onClick={goBack}>
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
          <main className='show'>
            <Tickets state={state} goBack={showPlayersPage} />
          </main>

          <Footer />
        </>
      )}

      <Modal
        openModal={openNameModal}
        closeModal={closeNameModal}
        headerText='Change Name'
      >
        <form onSubmit={handleNameSubmit}>
          <div className='form-input'>
            <label htmlFor='name'>Name:*</label>

            <input
              type='text'
              id='name'
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <button type='submit'>Submit</button>
        </form>
      </Modal>

      <Modal
        openModal={numbersModal.open}
        closeModal={closeNumbersModal}
        headerText='Guess Winner Numbers'
      >
        <p>{numbersModal.msg}</p>

        <form onSubmit={handleNumbersSubmit}>
          {renderNumberButtons()}

          <div className='selected-numbers'>
            <p>Selected Numbers: {selectedNumbers.join(", ") || "None"}</p>
          </div>

          <div className='buttons'>
            <button type='submit' disabled={selectedNumbers.length !== 5}>
              Submit
            </button>

            <button type='button' onClick={closeNumbersModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Player;

import { useState, useEffect } from "react";
import Modal from "./Modal";
import GameImage from "./GameImage";
import { areNumbersValid } from "../gamelogic/general";
import { submitNumbers } from "../gamelogic/player";
import "./player.css";

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

  const [name, setName] = useState(state.player.name);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  const handleNameClick = () => setOpenNameModal(true);
  const closeNameModal = () => setOpenNameModal(false);
  const handleNameSubmit = (event) => {
    event.preventDefault();
    const newState = JSON.parse(JSON.stringify(state));
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
    if (!areNumbersValid(numbers)) {
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
    submitNumbers(numbers, state, setState);
    closeNumbersModal();
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  const numberInputJSX = (number, index) => {
    const grammarTags = ["st", "nd", "rd", "th", "th"];
    return (
      <div className="form-input" key={index}>
        <label htmlFor="name">
          {index + 1}
          {grammarTags[index]} num:*
        </label>
        <input
          type="number"
          id={`number-${index}`}
          value={number}
          onChange={(event) => {
            const newNumbers = [...numbers];
            newNumbers[index] = +event.target.value;
            setNumbers(newNumbers);
          }}
          min="1"
          max="39"
          required
        />
      </div>
    );
  };

  return (
    <>
      <h1 className="color-change">
        Welcome, <output>{state.player.name}</output>
      </h1>
      <div className="buttons">
        <button type="button" onClick={handleNameClick}>
          Name
        </button>
        <button type="button" onClick={handleGameClick}>
          Game
        </button>
        <button type="button" onClick={goBack}>
          Back
        </button>
      </div>
      <GameImage />

      <Modal
        openModal={openNameModal}
        closeModal={closeNameModal}
        headerText="Chnge Name"
      >
        <form onSubmit={handleNameSubmit}>
          <div className="form-input">
            <label htmlFor="name">Name:*</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </Modal>

      <Modal
        openModal={numbersModal.open}
        closeModal={closeNumbersModal}
        headerText="Choose Winner Numbers"
      >
        <p>{numbersModal.msg}</p>
        <form onSubmit={handleNumbersSubmit}>
          <div className="number-inputs">
            {numbers.map((number, index) => numberInputJSX(number, index))}
          </div>

          <div className="buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={closeNumbersModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Player;

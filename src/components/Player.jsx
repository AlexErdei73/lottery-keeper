import { useState } from "react";
import Modal from "./Modal";
import GameImage from "./GameImage";
import "./player.css";

const Player = ({ state, setState, goBack }) => {
  const [openNameModal, setOpenNameModal] = useState(false);
  const [openNumbersModal, setOpenNumbersModal] = useState(false);

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
  const handleGameClick = () => setOpenNumbersModal(true);
  const closeNumbersModal = () => setOpenNumbersModal(false);
  const handleNumbersSubmit = (event) => {
    event.preventDefault();
    console.log(numbers);
    closeNumbersModal();
  };

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
        openModal={openNumbersModal}
        closeModal={closeNumbersModal}
        headerText="Choose Winner Numbers"
      >
        <p>
          Choose 5 different numbers between 1 and 39. The game costs 500
          credits.
        </p>
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

import { useState, react } from "react";
import Modal from "./Modal";

const Player = ({ state, setState, goBack }) => {
  const [openNameModal, setOpenNameModal] = useState(false);
  const [name, setName] = useState(state.player.name);

  const handleNameClick = () => setOpenNameModal(true);
  const closeNameModal = () => setOpenNameModal(false);
  const handleNameSubmit = (event) => {
    event.preventDefault();
    const newState = JSON.parse(JSON.stringify(state));
    newState.player.name = name;
    setState(newState);
    closeNameModal();
  };
  const handleGameClick = () => {};

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
    </>
  );
};

export default Player;

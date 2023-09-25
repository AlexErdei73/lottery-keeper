import { useState, useEffect, React } from "react";
import TicketModal from "./TicketModal";
import "./tickets.css";

const Tickets = ({ state, goBack }) => {
  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [drawIndex, setDrawIndex] = useState(state.draws.length);

  const getGames = () =>
    state.games.filter((game) => game.drawIndex === +drawIndex);
  const [games, setGames] = useState(getGames());

  const handleTicketClick = (event) => {
    const index = +event.target.getAttribute("data-index");
    setIndex(index);
    setOpenModal(true);
  };

  useEffect(() => {
    setGames(getGames());
  }, [drawIndex]);

  return (
    <>
      <h1 className="color-change">Tickets</h1>
      <div className="form-input">
        <label htmlFor="drawIndex">Draw Number:*</label>
        <input
          type="number"
          id="drawIndex"
          min="1"
          max={state.draws.length}
          value={drawIndex}
          onChange={(event) => setDrawIndex(event.target.value)}
          required
        />
      </div>
      {!!games.length && (
        <div className="buttons tickets">
          {games.map((_game, index) => (
            <button
              type="button"
              key={index}
              data-index={index}
              onClick={handleTicketClick}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
      <button type="button" onClick={goBack}>
        Back
      </button>

      <TicketModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        game={games[index]}
        index={index}
      />
    </>
  );
};

export default Tickets;

import { useState, useEffect, React } from "react";
import TicketModal from "./TicketModal";
import "./tickets.css";

const Tickets = ({ state, goBack }) => {
  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [drawIndex, setDrawIndex] = useState(state.draws.length);

  const getGames = () => {
    const games = state.games.filter((game) => game.drawIndex === +drawIndex);
    games.forEach((game, i) => {
      game.index = i;
    });
    return games;
  };

  const [games, setGames] = useState(getGames());

  function getAllRewards() {
    return games.reduce((acc, game) => acc + game.creditReward, 0);
  }

  const handleTicketClick = (event) => {
    const index = +event.target.getAttribute("data-index");
    setIndex(index);
    setOpenModal(true);
  };

  const handleSortClick = () => {
    const newGames = [...games];
    const sortedGames = newGames.sort(
      (gameA, gameB) => gameB.numberOfHits - gameA.numberOfHits
    );
    setGames(sortedGames);
  };

  useEffect(() => {
    setGames(getGames());
  }, [drawIndex]);

  return (
    <>
      <h1 className="color-change">Tickets</h1>
      <div>
        All Winnings: <output>{getAllRewards()}</output>
      </div>
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
          {games.map((game, index) => (
            <button
              type="button"
              key={index}
              data-index={index}
              onClick={handleTicketClick}
            >
              {game.index + 1}
            </button>
          ))}
        </div>
      )}
      <div className="buttons">
        <button type="button" onClick={handleSortClick}>
          Sort
        </button>
        <button type="button" onClick={goBack}>
          Back
        </button>
      </div>

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

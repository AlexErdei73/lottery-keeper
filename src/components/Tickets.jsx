import { useState, useEffect, React } from "react";
import TicketModal from "./TicketModal";
import DrawInfoModal from "./DrawInfoModal";
import "./tickets.css";

const Tickets = ({ state, goBack, option = "player" }) => {
  const [index, setIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [drawIndex, setDrawIndex] = useState(state.draws.length);
  const [openDrawInfoModal, setOpenDrawInfoModal] = useState(false);

  const getGames = () => {
    const games = state.games.filter((game) => game.drawIndex === +drawIndex);
    games.forEach((game, i) => {
      game.index = i;
    });
    return games;
  };

  const [games, setGames] = useState(
    getGames().filter((game) => game.isPlayer)
  );
  const [simuGames, setSimuGames] = useState(
    getGames().filter((game) => !game.isPlayer)
  );

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

  const handleInfoClick = () => setOpenDrawInfoModal(true);

  useEffect(() => {
    setGames(getGames().filter((game) => game.isPlayer));
    setSimuGames(getGames().filter((game) => !game.isPlayer));
  }, [state, drawIndex]);

  return (
    <>
      <h1 className="color-change">Tickets</h1>
      <div className="buttons">
        {option === "player" && (
          <button type="button" onClick={handleSortClick}>
            Sort
          </button>
        )}
        {option !== "player" && (
          <button type="button" onClick={handleInfoClick}>
            Info
          </button>
        )}
        <button type="button" onClick={goBack}>
          Back
        </button>
      </div>
      <div>
        All Winnings: <output>{getAllRewards()}</output>
      </div>
      <div className="form-input">
        <label htmlFor="drawIndex">Draw Number:*</label>
        <input
          type="number"
          id="drawIndex"
          min="1"
          max={state.draws.length + 1}
          value={drawIndex + 1}
          onChange={(event) => setDrawIndex(event.target.value - 1)}
          required
        />
      </div>
      {option !== "player" && <div>{state.player.name}'s Games:</div>}
      {!!games.length && (
        <div className="buttons tickets">
          {games.map((game) => (
            <button
              type="button"
              key={game.index}
              data-index={game.index}
              onClick={handleTicketClick}
            >
              {game.index + 1}
            </button>
          ))}
        </div>
      )}
      {option !== "player" && <div>Simulation Games:</div>}
      {!!simuGames.length && option !== "player" && (
        <div className="buttons tickets">
          {simuGames.map((game, index) => (
            <button
              type="button"
              key={game.index}
              data-index={game.index}
              onClick={handleTicketClick}
            >
              {game.index + 1}
            </button>
          ))}
        </div>
      )}

      <TicketModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        game={getGames()[index]}
        index={index}
      />

      <DrawInfoModal
        state={state}
        drawIndex={drawIndex}
        openModal={openDrawInfoModal}
        closeModal={() => setOpenDrawInfoModal(false)}
      />
    </>
  );
};

export default Tickets;

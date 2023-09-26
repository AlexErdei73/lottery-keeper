import { useState } from "react";
import Header from "./Header";
import GameImage from "./GameImage";
import Modal from "./Modal";
import Tickets from "./Tickets";
import { draw, simulateGames } from "../gamelogic/operator";
import { INITIAL_STATE } from "../helper";

const Operator = ({ state, setState, goBack }) => {
  const [drawReport, setDrawReport] = useState({
    rewards: [0, 0, 0, 0, 0, 0],
    gamesCountsByHits: [0, 0, 0, 0, 0, 0],
    payouts: [0, 0, 0, 0, 0, 0],
    gamesCounts: 0,
    revenue: 0,
    profit: 0,
  });
  const [openModal, setOpenModal] = useState(false);
  const [openSimuModal, setOpenSimuModal] = useState(false);
  const [showTickets, setShowTickets] = useState(false);

  const closeModal = () => setOpenModal(false);
  const closeSimuModal = () => setOpenSimuModal(false);

  const handleDrawClick = () => {
    const drawInfo = draw(state, setState);
    const gamesCounts = drawInfo.gamesCountsByHits.reduce(
      (acc, gamesCount) => acc + gamesCount,
      0
    );
    const payouts = drawInfo.rewards.map(
      (reward, hits) => reward * drawInfo.gamesCountsByHits[hits]
    );
    const totalPayout = payouts.reduce((acc, payout) => acc + payout, 0);
    const revenue = gamesCounts * 500;
    setDrawReport({
      rewards: drawInfo.rewards,
      gamesCountsByHits: drawInfo.gamesCountsByHits,
      payouts,
      gamesCounts,
      revenue,
      totalPayout,
      profit: revenue - totalPayout,
      numberOfCorrectGusses: drawInfo.gamesCountsByHits.reduce(
        (acc, gamesCount, hits) => acc + gamesCount * hits,
        0
      ),
      payoutPerTicket:
        payouts.reduce((acc, payout) => acc + payout, 0) / gamesCounts,
    });
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
        <main>
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
      )}
      {showTickets && (
        <main>
          <Tickets state={state} goBack={showOperatorPage} option="operator" />
        </main>
      )}

      <Modal
        openModal={openModal}
        closeModal={closeModal}
        headerText="Draw Info"
      >
        <div>
          Rewards: <output>{drawReport.rewards.join(", ")}</output>
        </div>
        <div>
          Games Counts By Hits:{" "}
          <output>{drawReport.gamesCountsByHits.join(", ")}</output>
        </div>
        <div>
          Payouts: <output>{drawReport.payouts.join(", ")}</output>
        </div>
        <div>
          Games Counts: <output>{drawReport.gamesCounts}</output>
        </div>
        <div>
          Revenue: <output>{drawReport.revenue}</output>
        </div>
        <div>
          Total Payout: <output>{drawReport.totalPayout}</output>
        </div>
        <div>
          Profit: <output>{drawReport.profit}</output>
        </div>
        <div>
          Number Of Correct Guesses:{" "}
          <output>{drawReport.numberOfCorrectGusses}</output>
        </div>
        <div>
          Payout Per Ticket: <output>{drawReport.payoutPerTicket}</output>
        </div>
        <button type="button" onClick={closeModal}>
          OK
        </button>
      </Modal>

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

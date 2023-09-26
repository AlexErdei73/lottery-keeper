import Modal from "./Modal";
import { getHitsCount } from "../gamelogic/general";

const TicketModal = ({ openModal, closeModal, game, index }) => {
  return (
    <>
      {game && (
        <Modal
          openModal={openModal}
          closeModal={closeModal}
          headerText={`Ticket ${index + 1}`}
        >
          <div>Numbers: {game.numbers.join(", ")}</div>
          <div>Winning Numbers: {game.winningNumbers.join(", ")}</div>
          <div>Played by: {game.isPlayer ? "Player" : "Computer"}</div>
          <div>Draw: {game.drawIndex + 1}</div>
          <div>
            Number of Hits: {getHitsCount(game.numbers, game.winningNumbers)}
          </div>
          <div>Credit Reward: {game.creditReward}</div>
        </Modal>
      )}
    </>
  );
};

export default TicketModal;

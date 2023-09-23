import Modal from "./Modal";

const TicketModal = ({ openModal, closeModal, game, index }) => {
  return (
    <Modal
      openModal={openModal}
      closeModal={closeModal}
      headerText={`Ticket ${index + 1}`}
    >
      <div>Numbers: {game.numbers.join(", ")}</div>
    </Modal>
  );
};

export default TicketModal;

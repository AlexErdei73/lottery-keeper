const Tickets = ({ games, goBack }) => {
  return (
    <>
      <h1 className="color-change">Tickets</h1>
      <button type="button" onClick={goBack}>
        Back
      </button>
    </>
  );
};

export default Tickets;

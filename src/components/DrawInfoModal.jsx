import Modal from "./Modal";

const DrawInfoModal = ({ state, drawIndex, openModal, closeModal }) => {
  const drawInfo =
    drawIndex > -1 && drawIndex < state.drawInfos.length
      ? state.drawInfos[drawIndex]
      : { gamesCountsByHits: [0, 0, 0, 0, 0, 0], rewards: [0, 0, 0, 0, 0, 0] };

  const gamesCounts = drawInfo.gamesCountsByHits.reduce(
    (acc, gamesCount) => acc + gamesCount,
    0
  );
  const payouts = drawInfo.rewards.map(
    (reward, hits) => reward * drawInfo.gamesCountsByHits[hits]
  );
  const totalPayout = payouts.reduce((acc, payout) => acc + payout, 0);
  const revenue = gamesCounts * 500;
  const drawReport = {
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
    payoutPerTicket: gamesCounts
      ? payouts.reduce((acc, payout) => acc + payout, 0) / gamesCounts
      : 0,
  };

  return (
    <Modal
      openModal={openModal && drawIndex > -1}
      closeModal={closeModal}
      headerText={`Draw-${drawIndex + 1} Info`}
    >
      <table>
        <thead>
          <tr>
            <th>Hits</th>
            <th>0</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Game Count</th>
            {drawReport.gamesCountsByHits.map((count, i) => (
              <td key={i}>{count}</td>
            ))}
          </tr>
          <tr>
            <th>Reward</th>
            {drawReport.rewards.map((reward, i) => (
              <td key={i}>{reward}</td>
            ))}
          </tr>
          <tr>
            <th>Payout</th>
            {drawReport.payouts.map((payout, i) => (
              <td key={i}>{payout}</td>
            ))}
          </tr>
        </tbody>
      </table>
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
  );
};

export default DrawInfoModal;

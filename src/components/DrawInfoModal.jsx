import { useState } from "react";
import Modal from "./Modal";
import "./drawInfoModal.css";

const DrawInfoModal = ({
	state,
	drawIndex,
	openModal,
	closeModal,
	option = "player",
}) => {
	const [numberOfHits, setNumberOfHits] = useState([0, 1, 2, 3, 4, 5]);
	const drawInfo =
		drawIndex > -1 && drawIndex < state.drawInfos.length
			? state.drawInfos[drawIndex]
			: { gamesCountsByHits: [0, 0, 0, 0, 0, 0], rewards: [0, 0, 0, 0, 0, 0] };

	const gamesCountsByHits = (() => {
		if (option !== "player") return drawInfo.gamesCountsByHits;
		else {
			const games = state.games.filter(
				(game) => game.isPlayer && game.drawIndex === drawIndex
			);
			const gamesCountsByHits = [0, 0, 0, 0, 0, 0];
			games.forEach((game) => {
				gamesCountsByHits[game.numberOfHits] += 1;
			});
			return gamesCountsByHits;
		}
	})();

	const gamesCounts = gamesCountsByHits.reduce(
		(acc, gamesCount) => acc + gamesCount,
		0
	);
	const payouts = drawInfo.rewards.map(
		(reward, hits) => reward * gamesCountsByHits[hits]
	);
	const totalPayout = payouts.reduce((acc, payout) => acc + payout, 0);
	const revenue = gamesCounts * 500;
	const drawReport = {
		rewards: drawInfo.rewards,
		gamesCountsByHits,
		payouts,
		gamesCounts,
		revenue,
		totalPayout,
		profit: revenue - totalPayout,
		numberOfCorrectGusses: gamesCountsByHits.reduce(
			(acc, gamesCount, hits) => acc + gamesCount * hits,
			0
		),
		payoutPerTicket: gamesCounts
			? payouts.reduce((acc, payout) => acc + payout, 0) / gamesCounts
			: 0,
	};

	function rearrange(array) {
		return numberOfHits.map((i) => array[i]);
	}

	const handleHitsClick = () => setNumberOfHits([0, 1, 2, 3, 4, 5]);
	const handleGameCountClick = () => {
		const newNumberOfHits = [...numberOfHits];
		newNumberOfHits.sort(
			(hitsA, hitsB) => gamesCountsByHits[hitsB] - gamesCountsByHits[hitsA]
		);
		setNumberOfHits(newNumberOfHits);
	};
	const handleRewardClick = () => {
		const newNumberOfHits = [...numberOfHits];
		newNumberOfHits.sort(
			(hitsA, hitsB) => drawReport.rewards[hitsB] - drawReport.rewards[hitsA]
		);
		setNumberOfHits(newNumberOfHits);
	};
	const handlePayoutsClick = () => {
		const newNumberOfHits = [...numberOfHits];
		newNumberOfHits.sort((hitsA, hitsB) => payouts[hitsB] - payouts[hitsA]);
		setNumberOfHits(newNumberOfHits);
	};

	return (
		<Modal
			openModal={openModal && drawIndex > -1}
			closeModal={closeModal}
			headerText={`Draw-${drawIndex + 1} Info`}>
			<table>
				<thead>
					<tr>
						<th>
							<button type="button" onClick={handleHitsClick}>
								Hits
							</button>
						</th>
						{numberOfHits.map((hits, i) => (
							<th key={i}>{hits}</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>
							<button type="button" onClick={handleGameCountClick}>
								Game Count
							</button>
						</th>
						{rearrange(drawReport.gamesCountsByHits).map((count, i) => (
							<td key={i}>{count}</td>
						))}
					</tr>
					<tr>
						<th>
							<button type="button" onClick={handleRewardClick}>
								Reward
							</button>
						</th>
						{rearrange(drawReport.rewards).map((reward, i) => (
							<td key={i}>{reward}</td>
						))}
					</tr>
					<tr>
						<th>
							<button type="button" onClick={handlePayoutsClick}>
								Payout
							</button>
						</th>
						{rearrange(drawReport.payouts).map((payout, i) => (
							<td key={i}>{payout}</td>
						))}
					</tr>
				</tbody>
			</table>
			<div>
				Total Payout: <output>{drawReport.totalPayout}</output>
			</div>
			{option !== "player" && (
				<div>
					Profit: <output>{drawReport.profit}</output>
				</div>
			)}
			<div>
				Number Of Correct Guesses:{" "}
				<output>{drawReport.numberOfCorrectGusses}</output>
			</div>
			{option !== "player" && (
				<div>
					Payout Per Ticket: <output>{drawReport.payoutPerTicket}</output>
				</div>
			)}
			<button type="button" onClick={closeModal}>
				OK
			</button>
		</Modal>
	);
};

export default DrawInfoModal;

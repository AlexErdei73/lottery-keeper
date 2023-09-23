import { useState, React } from "react";
import TicketModal from "./TicketModal";
import "./tickets.css";

const Tickets = ({ games, goBack }) => {
	const [index, setIndex] = useState(0);
	const [openModal, setOpenModal] = useState(false);

	const handleTicketClick = (event) => {
		const index = +event.target.getAttribute("data-index");
		setIndex(index);
		setOpenModal(true);
	};

	return (
		<>
			<h1 className="color-change">Tickets</h1>
			{games.length && (
				<div className="buttons tickets">
					{games.map((_game, index) => (
						<button
							type="button"
							key={index}
							data-index={index}
							onClick={handleTicketClick}>
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

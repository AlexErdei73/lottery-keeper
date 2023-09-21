import { useState, useEffect, useRef } from "react";
import "./App.css";
import lottoPic from "./assets/images/lotteryticket.avif";
import Modal from "./components/Modal";
import Player from "./components/Player";
import Operator from "./components/Operator";

function App() {
	const [state, setState] = useState({
		isPlayer: false,
		isOperator: false,
		player: {
			name: "Player",
			balance: 10000,
			games: [],
		},
		operator: {
			balance: 0,
			games: [],
		},
		draws: [],
		allGames: [],
	});

	const [openModal, setOpenModal] = useState(false);

	const closeModal = () => setOpenModal(false);

	function handleRoleClick(roleIndex) {
		const roles = ["Player", "Operator"];
		const newState = { ...state };
		if (roleIndex >= 0) {
			const trueRole = roles[roleIndex];
			const falseRole = roles[1 - roleIndex];
			newState[`is${trueRole}`] = true;
			newState[`is${falseRole}`] = false;
		} else {
			newState.isPlayer = false;
			newState.isOperator = false;
		}
		setState(newState);
	}

	const handlePlayerClick = () => handleRoleClick(0);
	const handleOperatorClick = () => handleRoleClick(1);
	const handleBackClick = () => handleRoleClick(-1);

	/* Little opening animation */
	//const title = useRef();
	const appNode = useRef();
	useEffect(() => {
		setTimeout(() => {
			appNode.current.classList.add("show");
		}, 0);
		/*setInterval(() => {
			title.current.classList.toggle("color-change");
		}, 1000);*/
	}, []);

	const openingPage = (
		<>
			<h1 className="color-change" /*ref={title}*/>Lotto Keeper</h1>
			<div className="img-container">
				<img
					className="landing-img"
					src={lottoPic}
					alt="lottery ticket image"
				/>
			</div>
			<button type="button" onClick={() => setOpenModal(true)}>
				Entrance
			</button>
			<Modal
				openModal={openModal}
				closeModal={closeModal}
				headerText="Question">
				Which character are you playing?
				<div className="buttons">
					<button type="button" onClick={handlePlayerClick}>
						Player
					</button>
					<button type="button" onClick={handleOperatorClick}>
						Operator
					</button>
				</div>
			</Modal>
		</>
	);

	return (
		<div className="app" ref={appNode}>
			{!(state.isPlayer || state.isOperator) && openingPage}
			{state.isPlayer && (
				<Player state={state} goBack={handleBackClick}></Player>
			)}
			{state.isOperator && (
				<Operator state={state} goBack={handleBackClick}></Operator>
			)}
		</div>
	);
}

export default App;

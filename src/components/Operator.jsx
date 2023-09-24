import Header from "./Header";
import GameImage from "./GameImage";
import { draw } from "../gamelogic/operator";

const Operator = ({ state, setState, goBack }) => {
	const handleDrawClick = () => draw(state, setState);
	return (
		<>
			<Header role={state.operator} />
			<main>
				<div className="buttons">
					<button type="button" onClick={handleDrawClick}>
						Draw
					</button>
					<button type="button" onClick={goBack}>
						Back
					</button>
				</div>
				<GameImage />
			</main>
		</>
	);
};

export default Operator;

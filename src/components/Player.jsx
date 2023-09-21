const Player = ({ state, goBack }) => {
	return (
		<>
			<h1>Player page</h1>
			<button type="button" onClick={goBack}>
				Back
			</button>
		</>
	);
};

export default Player;

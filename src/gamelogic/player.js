import { areNumbersValid } from "./general";

export function submitNumbers(numbers, state, setState) {
	if (state.player.balance < 500) return;
	if (!areNumbersValid(numbers)) return;
	const newState = JSON.parse(JSON.stringify(state));
	newState.player.balance -= 500;
	newState.operator.balance += 500;
	const drawIndex = state.draws.length;
	const newGame = {
		isPlayer: true,
		numbers,
		drawIndex,
		winningNumbers: [],
		numberOfHits: 0,
		creditReward: 0,
	};
	newState.games.push(newGame);
	setState(newState);
}

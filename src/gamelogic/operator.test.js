import { test, expect, beforeEach } from "vitest";
import { INITIAL_STATE } from "../helper";
import { draw, getWinningNumbers, simulateGames } from "./operator";
import { areNumbersValid } from "./general";

let state = JSON.parse(JSON.stringify(INITIAL_STATE));
let newState = JSON.parse(JSON.stringify(INITIAL_STATE));
const setState = (newState) => (state = newState);
const INITIAL_GAME = {
	isPlayer: true,
	numbers: [],
	drawIndex: 0,
	winningNumbers: [],
	numberOfHits: 0,
	creditReward: 0,
};
const winningNumbers = [15, 16, 2, 17, 4];
const testGameNumbers = [
	[20, 21, 22, 23, 24],
	[1, 2, 3, 4, 5],
	[16, 2, 17, 3, 5],
	[1, 2, 3, 4, 5],
	[5, 6, 7, 8, 9],
];
const testGameHits = [0, 2, 3, 2, 0];
const testGameRewards = [0, 158, 1684, 158, 0];

beforeEach(() => {
	state = JSON.parse(JSON.stringify(INITIAL_STATE));
	newState = JSON.parse(JSON.stringify(INITIAL_STATE));
	testGameNumbers.forEach((numbers, i) => {
		const game = { ...INITIAL_GAME };
		game.numbers = numbers;
		state.games.push({ ...game });
		game.winningNumbers = winningNumbers;
		game.numberOfHits = testGameHits[i];
		game.creditReward = testGameRewards[i];
		newState.games.push(game);
	});
	state.player.balance = 7500;
	state.operator.balance = 2500;
	newState.player.balance = 9500;
	newState.operator.balance = 500;
});

test("getWinningNumbers returns 5 different numbers, each between 1 and 39", () => {
	const winningNumbers = getWinningNumbers();
	expect(areNumbersValid(winningNumbers)).toBe(true);
});

test("draw pushes winning numbers to state.draws array", () => {
	draw(state, setState, winningNumbers);
	expect(state.draws[state.draws.length - 1]).toEqual(winningNumbers);
});

test("draw correctly updates state.games", () => {
	draw(state, setState, winningNumbers);
	expect(state.games).toEqual(newState.games);
});

test("draw correctly updates state.player.balance and state.operator.balance", () => {
	draw(state, setState, winningNumbers);
	expect(state.player.balance).toBe(newState.player.balance);
	expect(state.operator.balance).toBe(newState.operator.balance);
});

test("draw has a return object with containing the rewards for each number of hits", () => {
	const drawInfo = draw(state, setState, winningNumbers);
	expect(drawInfo.rewards).toEqual([0, 0, 158, 1684, 0, 0]);
});

test("draw has a return object with containing the number of games for each number of hits", () => {
	const drawInfo = draw(state, setState, winningNumbers);
	expect(drawInfo.gamesCountsByHits).toEqual([2, 0, 2, 1, 0, 0]);
});

test("simulateGames(state, setState, 5) adds 5 new games to state", () => {
	simulateGames(state, setState, 5);
	const allGames = state.games;
	const simulatedGames = allGames.filter((game) => !game.isPlayer);
	expect(simulatedGames.length).toBe(5); // 5 simulated game
	simulatedGames.forEach((game) => {
		// numbers are valid in each game
		expect(areNumbersValid(game.numbers)).toBe(true);
		// exchange random numbers to [1, 2, 3, 4, 5]
		game.numbers = [1, 2, 3, 4, 5];
		// check each game object
		expect(game).toEqual({
			isPlayer: false,
			numbers: [1, 2, 3, 4, 5],
			drawIndex: 0,
			winningNumbers: [],
			numberOfHits: 0,
			creditReward: 0,
		});
	});
});

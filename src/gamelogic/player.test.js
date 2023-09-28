import { test, expect, beforeEach } from "vitest";
import { INITIAL_STATE } from "../helper";
import { submitNumbers } from "./player";

let state;
let newState;
const setState = (newState) => (state = newState);

beforeEach(() => {
	state = JSON.parse(JSON.stringify(INITIAL_STATE));
	state.draws = [
		[1, 2, 3, 4, 5],
		[1, 2, 3, 4, 5],
	];
	newState = JSON.parse(JSON.stringify(state));
});

test("submitNumbers does not do anything if credit is less than 500", () => {
	state.player.balance = 490;
	newState.player.balance = 490;
	submitNumbers([6, 7, 8, 9, 10], state, setState);
	expect(state).toEqual(newState);
});

test("submitNumbers does not do anything if numbers are invalid", () => {
	submitNumbers([6, 7, 8, 9, 100], state, setState);
	expect(state).toEqual(newState);
});

test("submitNumbers submits a new game with valid numbers and enough credit", () => {
	newState.games.push({
		isPlayer: true,
		numbers: [6, 7, 8, 9, 10],
		drawIndex: 2,
		winningNumbers: [],
		numberOfHits: 0,
		creditReward: 0,
	});
	submitNumbers([6, 7, 8, 9, 10], state, setState);
	expect(state.games).toEqual(newState.games);
});

test("submitNumbers transfers 500 credit from player to operator", () => {
	newState.games.push({
		isPlayer: true,
		numbers: [6, 7, 8, 9, 10],
		drawIndex: 2,
		winningNumbers: [],
		numberOfHits: 0,
		creditReward: 0,
	});
	newState.player.balance = 9500;
	newState.operator.balance = 500;
	submitNumbers([6, 7, 8, 9, 10], state, setState);
	expect(state).toEqual(newState);
});

import { test, expect, beforeEach } from "vitest";
import { INITIAL_STATE } from "../helper";
import { draw } from "./operator";

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

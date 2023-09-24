import { areNumbersValid, getHitsCount } from "./general";

function getWinningNumbers() {
  const winningNumbers = [];
  while (!areNumbersValid(winningNumbers)) {
    for (let i = 0; i < 5; i++) {
      const number = Math.floor(Math.random() * 39) + 1;
      winningNumbers.push(number);
    }
  }
  return winningNumbers;
}

function getRewards(gamesToUpdate, gamesCountsByHits) {
  const rewards = [0, 0, 0, 0, 0, 0];
  /* The below values are calculated by me for 8 decimals.
  I tried to use chatGPT but it is surprisingly weak with
  these calculations. The values were bad and inaccurate
  even after 3 or 4 trials. The values, which chatGPT gave me, 
  did not even pass the simple test to add up to one. */
  const PROBABILITIES = [
    0.48328722, 0.40273935, 0.10393274, 0.00974369, 0.00029526, 0.00000174,
  ];
  const totalReward = gamesToUpdate.length * 400;
  let divisor = 0;
  gamesCountsByHits.forEach((n, i) => {
    if (i < 2) return;
    divisor += n / PROBABILITIES[i];
  });
  if (!divisor) return rewards;
  const X = totalReward / divisor;
  rewards.forEach((_reward, i) => {
    if (i < 2) return;
    rewards[i] = X / PROBABILITIES[i];
  });
  return rewards;
}

function updateGames(state) {
  const games = state.games;
  const drawIndex = state.draws.length - 1;
  const winningNumbers = state.draws[drawIndex];
  const gamesToUpdate = games.filter((game) => game.drawIndex === drawIndex);
  gamesToUpdate.forEach((game) => {
    game.winningNumbers = winningNumbers;
    game.numberOfHits = getHitsCount(game.numbers, winningNumbers);
  });
  const gamesCountsByHits = [0, 0, 0, 0, 0, 0];
  gamesToUpdate.forEach((game) => {
    gamesCountsByHits[game.numberOfHits]++;
  });
  const rewards = getRewards(gamesToUpdate, gamesCountsByHits);
  gamesToUpdate.forEach((game) => {
    game.creditReward = rewards[game.numberOfHits];
  });
}

function payRewards(state) {
  const games = state.games;
  const drawIndex = state.draws.length - 1;
  const updatedGames = games.filter((game) => game.drawIndex === drawIndex);
  updatedGames.forEach((game) => {
    if (game.isPlayer) state.player.balance += game.creditReward;
    state.operator.balance -= game.creditReward;
  });
}

export function draw(state, setState) {
  const newState = JSON.parse(JSON.stringify(state));
  newState.draws.push(getWinningNumbers());
  updateGames(newState);
  payRewards(newState);
  setState(newState);
}

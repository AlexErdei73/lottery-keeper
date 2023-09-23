export function areNumbersValid(numbers) {
	numbers.sort((smallNum, largeNum) => smallNum - largeNum);
	const LENGTH = 5;
	let result = true;
	numbers.forEach((number, index) => {
		if (index === LENGTH) return;
		if (number === numbers[index + 1]) result = false;
	});
	return result;
}

export function getHitsCount(numbers, winningNumbers) {
	let result = 0;
	if (winningNumbers.length === 0) return result;
	numbers.forEach((number) => {
		const index = winningNumbers.indexOf(number);
		if (index !== -1) result++;
	});
	return result;
}

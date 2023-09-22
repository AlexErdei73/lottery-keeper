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

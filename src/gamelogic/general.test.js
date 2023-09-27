import { expect, test } from "vitest";
import { areNumbersValid, getHitsCount } from "./general";

test("areNumbersValid returns false for less than 5 numbers", () => {
  expect(areNumbersValid([1, 2, 3, 4])).toBe(false);
});

test("areNumbersValid returns true for 5 different numbers", () => {
  expect(areNumbersValid([1, 2, 3, 4, 5])).toBe(true);
});

test("areNumbersValid returns false for 5 numbers, which have equal numbers", () => {
  expect(areNumbersValid([1, 2, 3, 3, 5])).toBe(false);
});

test("areNumbersValid returns false if numbers are out of range (from 1 to 39)", () => {
  expect(areNumbersValid([1, 2, 3, 4, 104])).toBe(false);
});

test("getHitsCount returns 0 if no winning numbers", () => {
  expect(getHitsCount([1, 2, 3, 4, 5], [])).toBe(0);
});

test("getHitsCount returns 0 if no matching numbers", () => {
  expect(getHitsCount([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toBe(0);
});

test("getHitsCount returns 3 if there are 3 matching numbers", () => {
  expect(getHitsCount([1, 2, 3, 4, 5], [6, 1, 8, 3, 2])).toBe(3);
});

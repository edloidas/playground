import assert from 'assert/strict';
import test, { describe } from 'node:test';
import { binarySearch } from './binarySearch';

describe('binarySearch()', () => {
  test('finds element in sorted array', () => {
    const array = [1, 3, 5, 7, 9, 11, 13, 15];
    assert.equal(binarySearch(array, 7), 3);
    assert.equal(binarySearch(array, 9), 4);
    assert.equal(binarySearch(array, 1), 0);
    assert.equal(binarySearch(array, 15), 7);
  });

  test('returns -1 when element not found', () => {
    const array = [1, 3, 5, 7, 9, 11, 13, 15];
    assert.equal(binarySearch(array, 0), -1);
    assert.equal(binarySearch(array, 8), -1);
    assert.equal(binarySearch(array, 16), -1);
  });

  test('works with array of length 1', () => {
    const array = [1];
    assert.equal(binarySearch(array, 1), 0);
    assert.equal(binarySearch(array, 2), -1);
  });

  test('works with empty array', () => {
    const array: number[] = [];
    assert.equal(binarySearch(array, 1), -1);
  });
});

export function binarySearch(array: number[], target: number): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const value = array[middle];

    if (value === target) {
      return middle;
    }

    if (value < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

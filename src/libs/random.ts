/**
 * ### Compute Random Integer
 * This function computes a random integer between min param and max param.
 * @param min The minimum limit.
 * @param max The maximum limit.
 * @returns The random integer between min and max.
 * @example
 * ```ts
 * computeRandInt(1, 100)
 * ```
 * @author Jon Ganebski
 */
export function computeRandInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * ### Random Array Elements
 * This function returns random elements from the array.
 * @param count The number of elements.
 * @param array The target array.
 * @returns The random elements of the array.
 * @example
 * ```ts
 * randArrayElements(2, [1, 2, 3, 4])
 * ```
 * @author Jon Ganebski
 */
export function randArrayElements<E = any>(count: number, array: E[]): E[] {
  if (!Number.isInteger(count)) {
    console.warn('The count param should be an integer.');
    return array;
  }
  if (count < 1) {
    console.warn('The count param should be bigger than 0');
    return array;
  }
  const { length } = array;
  if (length < count) {
    console.warn('You are expecting more elements than those in the array.');
    return array;
  }
  if (length === count) return array;

  const result: E[] = [];
  const pickedIndexes: number[] = [];

  while (result.length !== count) {
    const randInt = computeRandInt(0, length - 1);
    if (pickedIndexes.includes(randInt)) continue;
    result.push(array[randInt]);
    pickedIndexes.push(randInt);
  }
  return result;
}

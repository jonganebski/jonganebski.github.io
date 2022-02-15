export function computeRandInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

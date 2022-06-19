import { describe, it, expect } from 'vitest';
import { computeRandInt, randArrayElements } from './random';

describe('computeRandInt', () => {
  const MIN = 1;
  const MAX = 10;

  it('should return random integer between(including) MIN and MAX', () => {
    for (let i = 0; i < 100; i++) {
      const randInt = computeRandInt(MIN, MAX);
      expect(typeof randInt).eq('number');
      expect(randInt).gte(MIN).and.lte(MAX);
      expect(Number.isInteger(randInt)).eq(true);
    }
  });
});

describe('randArrayElements', () => {
  const originalArray = [1, 2, 3, 4, 5];

  it('should return original array when arguments are wrong', () => {
    const longerLength = originalArray.length + 1;
    expect(randArrayElements(longerLength, originalArray)).eq(originalArray);

    const floatLength = 1.2;
    expect(randArrayElements(floatLength, originalArray)).eq(originalArray);

    const minusLength = -1;
    expect(randArrayElements(minusLength, originalArray)).eq(originalArray);
  });

  it('should return random elements', () => {
    for (let i = 0; i < 100; i++) {
      const num = i + 1;
      originalArray.push(originalArray[originalArray.length - 1] + 1);
      const randElements = randArrayElements(num, originalArray);
      expect(randElements.length).eq(num);
      randElements.forEach((element) => {
        expect(originalArray).include(element);
      });
    }
  });
});

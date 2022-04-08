import { NODE } from './@types';
import { usePositions } from './usePositions';
import type { UseTetrominoResult } from './@types';

export function useO(): UseTetrominoResult {
  /**
   * ### Shape 0
   * ```
   * 0️⃣1️⃣
   * 2️⃣3️⃣
   * ```
   */
  const shape = ref<0>(0);

  const defaultPosition = Object.freeze<number[][]>([
    [2, 3],
    [2, 4],
    [3, 3],
    [3, 4],
  ]);

  const { position, nextPosition, endPosition, prepare, fall, moveLeft, moveRight } = usePositions(
    defaultPosition,
    shape,
  );

  return {
    id: NODE.O,
    prepare,
    fall,
    moveRight,
    moveLeft,
    position,
    endPosition,
    changeShape: () => {},
    defaultPosition,
    nextPosition,
    shape,
  };
}

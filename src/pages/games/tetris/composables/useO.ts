import { NODE } from './@types';
import { usePositions } from './usePositions';
import type { UseTetrominoResult } from './@types';
import { useNodes } from './useNodes';

export function useO(): UseTetrominoResult {
  /**
   * ### Shape 0
   * ```
   * 0️⃣1️⃣
   * 2️⃣3️⃣
   * ```
   */
  const shape = ref<0>(0);

  const { X_SIZE, TOP_RESERVE } = useNodes();

  const defaultPosition = Object.freeze<number[][]>([
    [TOP_RESERVE - 2, Math.floor(X_SIZE / 2) - 1],
    [TOP_RESERVE - 2, Math.floor(X_SIZE / 2)],
    [TOP_RESERVE - 1, Math.floor(X_SIZE / 2) - 1],
    [TOP_RESERVE - 1, Math.floor(X_SIZE / 2)],
  ]);

  const { position, nextPosition, endPosition, prepare, fall, moveLeft, moveRight } = usePositions(
    defaultPosition,
    shape,
  );

  return {
    defaultPosition,
    nextPosition,
    endPosition,
    position,
    shape,
    id: NODE.O,
    changeShape: () => {},
    moveRight,
    moveLeft,
    prepare,
    fall,
  };
}

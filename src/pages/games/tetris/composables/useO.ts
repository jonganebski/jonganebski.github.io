import { useNodes } from './useNodes';
import { usePositions } from './usePositions';

export function useO() {
  /**
   * ### Shape 0
   * ```
   * 0️⃣1️⃣
   * 2️⃣3️⃣
   * ```
   */
  const shape = ref<0>(0);

  const { NODE } = useNodes();

  const defaultPosition = Object.freeze([
    [2, 3],
    [2, 4],
    [3, 3],
    [3, 4],
  ]);

  const { position, endPosition, prepare, fall, moveLeft, moveRight } = usePositions(
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
  };
}

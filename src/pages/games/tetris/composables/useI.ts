import { useNodes } from './useNodes';
import { usePositions } from './usePositions';

export function useI() {
  /**
   * ### Shape 0
   * ```
   * ⬛⬛2️⃣⬛
   * ⬛⬛1️⃣⬛
   * ⬛⬛0️⃣⬛
   * ⬛⬛3️⃣⬛
   * ```
   * ### Shape 1
   * ```
   * ⬛⬛⬛⬛
   * ⬛⬛⬛⬛
   * 2️⃣1️⃣0️⃣3️⃣
   * ⬛⬛⬛⬛
   * ```
   * ### Shape 2
   * ```
   * ⬛3️⃣⬛⬛
   * ⬛0️⃣⬛⬛
   * ⬛1️⃣⬛⬛
   * ⬛2️⃣⬛⬛
   * ```
   * ### Shape 3
   * ```
   * ⬛⬛⬛⬛
   * ⬛⬛⬛⬛
   * 2️⃣1️⃣0️⃣3️⃣
   * ⬛⬛⬛⬛
   * ```
   */
  const shape = ref<0 | 1 | 2 | 3>(0);

  const { nodes, NODE, TOP_RESERVE, willCollide } = useNodes();

  const defaultPosition = Object.freeze([
    [2, 4],
    [1, 4],
    [0, 4],
    [3, 4],
  ]);

  const { position, nextPosition, endPosition, prepare, fall, moveRight, moveLeft } = usePositions(
    defaultPosition,
    shape,
  );

  function changeShape() {
    let offset = 0;
    let positionCandidate: number[][] = [...position.value];
    while (offset === 0 || willCollide(positionCandidate)) {
      if (shape.value === 0) {
        // To Shape 1
        positionCandidate = positionCandidate.map(([rowIdx, colIdx], i, arr) => {
          if (i === 0) return [rowIdx, colIdx + offset];
          if (i === 1) return [arr[0][0], arr[0][1] - 1 + offset];
          if (i === 2) return [arr[0][0], arr[0][1] - 2 + offset];
          return [arr[0][0], arr[0][1] + 1 + offset];
        });
      } else if (shape.value === 1) {
        // To Shape 2
        positionCandidate = positionCandidate.map(([rowIdx, colIdx], i, arr) => {
          if (i === 0) return [arr[1][0] - 1, arr[1][1] + offset];
          if (i === 1) return [rowIdx, colIdx + offset];
          if (i === 2) return [arr[1][0] + 1, arr[1][1] + offset];
          return [arr[1][0] - 2, arr[1][1] + offset];
        });
      } else if (shape.value === 2) {
        // To Shape 3
        positionCandidate = positionCandidate.map(([rowIdx, colIdx], i, arr) => {
          if (i === 0) return [arr[1][0], arr[1][1] + 1 + offset];
          if (i === 1) return [rowIdx, colIdx + offset];
          if (i === 2) return [arr[1][0], arr[1][1] - 1 + offset];
          return [arr[1][0], arr[1][1] + 2 + offset];
        });
      } else {
        // To Shape 0
        positionCandidate = positionCandidate.map(([rowIdx, colIdx], i, arr) => {
          if (i === 0) return [rowIdx, colIdx + offset];
          if (i === 1) return [arr[0][0] - 1, arr[0][1] + offset];
          if (i === 2) return [arr[0][0] - 2, arr[0][1] + offset];
          return [arr[0][0] + 1, arr[0][1] + offset];
        });
      }
      const cousion = offset > 0 ? 1 : -1;
      offset = -(offset + cousion); // 1, -2, 3, -4, 5, -6 ...
      if (offset > 10) return;
    }
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
    });
    position.value = [...positionCandidate];
    if (shape.value === 0) {
      shape.value = 1;
    } else if (shape.value === 1) {
      shape.value = 2;
    } else if (shape.value === 2) {
      shape.value = 3;
    } else {
      shape.value = 0;
    }
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.I;
    });
  }

  return {
    id: NODE.I,
    defaultPosition,
    nextPosition,
    endPosition,
    position,
    shape,
    prepare,
    fall,
    moveRight,
    moveLeft,
    changeShape,
  };
}

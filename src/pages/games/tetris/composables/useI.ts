import { useNodes } from './useNodes';
import { usePositions } from './usePositions';

export function useI() {
  /**
   * ### Shape 0
   * ```
   * 🟦
   * 🟦
   * 🟦
   * 🟦
   * ```
   * ### Shape 1
   * ```
   * 🟦🟦🟦🟦
   * ```
   */
  const shape = ref<0 | 1>(0);

  const { nodes, NODE, TOP_RESERVE, willCollide } = useNodes();

  const defaultPosition = Object.freeze([
    [0, 4],
    [1, 4],
    [2, 4],
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
        positionCandidate = positionCandidate.map(([rowIdx, colIdx], i, arr) => {
          if (i === 0) return [arr[2][0], arr[2][1] - 2 + offset];
          if (i === 1) return [arr[2][0], arr[2][1] - 1 + offset];
          if (i === 2) return [rowIdx, colIdx + offset];
          return [arr[2][0], arr[2][1] + 1 + offset];
        });
      } else {
        positionCandidate = positionCandidate.map(([rowIdx, colIdx], i, arr) => {
          if (i === 0) return [arr[2][0] - 2, arr[2][1] + offset];
          if (i === 1) return [arr[2][0] - 1, arr[2][1] + offset];
          if (i === 2) return [rowIdx, colIdx + offset];
          return [arr[2][0] + 1, arr[2][1] + offset];
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

import { useNodes } from './useNodes';
import { usePositions } from './usePositions';

export function useO() {
  const { nodes, NODE, TOP_RESERVE } = useNodes();

  const defaultPosition = Object.freeze([
    [2, 3],
    [2, 4],
    [3, 3],
    [3, 4],
  ]);

  const shape = ref<0>(0);

  const { position, endPosition, prepare, fall } = usePositions([...defaultPosition], shape);

  function moveRight() {
    let willCollide = false;
    position.value.forEach(([rowIdx, colIdx]) => {
      if (
        nodes.value[rowIdx][colIdx + 1] !== NODE.VOID &&
        nodes.value[rowIdx][colIdx + 1] !== NODE.BIRTH &&
        nodes.value[rowIdx][colIdx + 1] !== NODE.O
      )
        willCollide = true;
    });
    if (willCollide) return;
    position.value.forEach(([rowIdx, colIdx], i) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
      position.value[i] = [rowIdx, colIdx + 1];
    });
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.O;
    });
  }

  function moveLeft() {
    let willCollide = false;
    position.value.forEach(([rowIdx, colIdx], i) => {
      if (
        nodes.value[rowIdx][colIdx - 1] !== NODE.VOID &&
        nodes.value[rowIdx][colIdx - 1] !== NODE.BIRTH &&
        nodes.value[rowIdx][colIdx - 1] !== NODE.O
      )
        willCollide = true;
    });
    if (willCollide) return;
    position.value.forEach(([rowIdx, colIdx], i) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
      position.value[i] = [rowIdx, colIdx - 1];
    });
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.O;
    });
  }

  return { prepare, fall, moveRight, moveLeft, position, endPosition };
}

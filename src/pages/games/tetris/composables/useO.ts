import { useNodes } from './useNodes';

export function useO() {
  const { nodes, NODE, TOP_RESERVE } = useNodes();
  const defaultPosition = Object.freeze([
    [2, 3],
    [2, 4],
    [3, 3],
    [3, 4],
  ]);

  const position = ref([...defaultPosition]);
  const shape = ref<0>(0);
  const nextPosition = computed(() =>
    position.value.map(([rowIdx, colIdx]) => [rowIdx + 1, colIdx]),
  );

  function prepare() {
    shape.value = 0;
    position.value = [...defaultPosition];
    position.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = NODE.O));
  }

  function fall() {
    let isBlocked = false;
    for (let i = 0; i < nextPosition.value.length; i++) {
      const [nextRowIdx, nextColIdx] = nextPosition.value[i];
      if (
        nodes.value[nextRowIdx][nextColIdx] === NODE.BIRTH ||
        nodes.value[nextRowIdx][nextColIdx] === NODE.VOID ||
        nodes.value[nextRowIdx][nextColIdx] === NODE.O
      )
        continue;
      isBlocked = true;
      break;
    }
    if (isBlocked) {
      position.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = NODE.FOSSIL_O));
      return false;
    }
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
    });
    nextPosition.value.forEach(([nextRowIdx, nextColIdx]) => {
      nodes.value[nextRowIdx][nextColIdx] = NODE.O;
    });

    position.value = nextPosition.value;
    return true;
  }

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
    console.log(willCollide);
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

  return { prepare, fall, moveRight, moveLeft, position };
}

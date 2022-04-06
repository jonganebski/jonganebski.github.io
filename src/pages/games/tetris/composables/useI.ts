import { useNodes } from './useNodes';

export function useI() {
  const { nodes, NODE, TOP_RESERVE } = useNodes();
  const defaultPosition = Object.freeze([
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
  ]);

  const position = ref([...defaultPosition]);
  const shape = ref<0 | 1>(0);
  const nextPosition = computed(() =>
    position.value.map(([rowIdx, colIdx]) => [rowIdx + 1, colIdx]),
  );
  const endPosition = computed(computeEndPosition);

  function computeEndPosition() {
    let isBlocked = false;
    let x = 0;
    while (!isBlocked) {
      x++;
      for (let i = 0; i < position.value.length; i++) {
        const [rowIdx, colIdx] = position.value[i];
        if (
          nodes.value[rowIdx + x][colIdx] === NODE.BIRTH ||
          nodes.value[rowIdx + x][colIdx] === NODE.VOID ||
          nodes.value[rowIdx + x][colIdx] === NODE.I
        )
          continue;
        isBlocked = true;
        break;
      }
    }
    return position.value.map(([rowIdx, colIdx]) => [rowIdx + x - 1, colIdx]);
  }

  function prepare() {
    shape.value = 0;
    position.value = [...defaultPosition];
    position.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = NODE.I));
  }

  function fall() {
    let isBlocked = false;
    for (let i = 0; i < nextPosition.value.length; i++) {
      const [nextRowIdx, nextColIdx] = nextPosition.value[i];
      if (
        nodes.value[nextRowIdx][nextColIdx] === NODE.BIRTH ||
        nodes.value[nextRowIdx][nextColIdx] === NODE.VOID ||
        nodes.value[nextRowIdx][nextColIdx] === NODE.I
      )
        continue;
      isBlocked = true;
      break;
    }
    if (isBlocked) {
      position.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = NODE.FOSSIL_I));
      return false;
    }
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
    });
    nextPosition.value.forEach(([nextRowIdx, nextColIdx]) => {
      nodes.value[nextRowIdx][nextColIdx] = NODE.I;
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
        nodes.value[rowIdx][colIdx + 1] !== NODE.I
      )
        willCollide = true;
    });
    if (willCollide) return;
    position.value.forEach(([rowIdx, colIdx], i) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
      position.value[i] = [rowIdx, colIdx + 1];
    });
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.I;
    });
  }

  function moveLeft() {
    let willCollide = false;
    position.value.forEach(([rowIdx, colIdx]) => {
      if (
        nodes.value[rowIdx][colIdx - 1] !== NODE.VOID &&
        nodes.value[rowIdx][colIdx - 1] !== NODE.BIRTH &&
        nodes.value[rowIdx][colIdx - 1] !== NODE.I
      )
        willCollide = true;
    });
    if (willCollide) return;
    position.value.forEach(([rowIdx, colIdx], i) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
      position.value[i] = [rowIdx, colIdx - 1];
    });
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.I;
    });
  }

  function changeShape() {
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
    });
    if (shape.value === 0) {
      position.value.forEach(([rowIdx, colIdx], i, arr) => {
        if (i === 0) position.value[i] = [arr[2][0], arr[2][1] - 2];
        if (i === 1) position.value[i] = [arr[2][0], arr[2][1] - 1];
        if (i === 2) position.value[i] = [rowIdx, colIdx];
        if (i === 3) position.value[i] = [arr[2][0], arr[2][1] + 1];
      });
      shape.value = 1;
    } else {
      position.value.forEach(([rowIdx, colIdx], i, arr) => {
        if (i === 0) position.value[i] = [arr[2][0] - 2, arr[2][1]];
        if (i === 1) position.value[i] = [arr[2][0] - 1, arr[2][1]];
        if (i === 2) position.value[i] = [rowIdx, colIdx];
        if (i === 3) position.value[i] = [arr[2][0] + 1, arr[2][1]];
      });
      shape.value = 0;
    }
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.I;
    });
  }

  return {
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

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

  function willCollide(position: number[][]) {
    for (let i = 0; i < position.length; i++) {
      const [rowIdx, colIdx] = position[i];
      if (
        nodes.value[rowIdx][colIdx] !== NODE.VOID &&
        nodes.value[rowIdx][colIdx] !== NODE.BIRTH &&
        nodes.value[rowIdx][colIdx] !== NODE.I
      )
        return true;
    }
    return false;
  }

  function moveRight() {
    const positionCandidate = position.value.map(([rowIdx, colIdx]) => [rowIdx, colIdx + 1]);
    if (willCollide(positionCandidate)) return;
    position.value.forEach(([rowIdx, colIdx], i) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
      position.value[i] = [rowIdx, colIdx + 1];
    });
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.I;
    });
  }

  function moveLeft() {
    const positionCandidate = position.value.map(([rowIdx, colIdx]) => [rowIdx, colIdx - 1]);
    if (willCollide(positionCandidate)) return;
    position.value.forEach(([rowIdx, colIdx], i) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
      position.value[i] = [rowIdx, colIdx - 1];
    });
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.I;
    });
  }

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

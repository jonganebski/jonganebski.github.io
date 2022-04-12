import { Ref } from 'vue';
import { useNodes } from './useNodes';
import { NODE } from './@types';

function deepCopy(arr: Readonly<number[][]>) {
  return [[...arr[0]], [...arr[1]], [...arr[2]], [...arr[3]]];
}

export function usePositions(defaultPosition: Readonly<number[][]>, shape: Ref<number>) {
  const { nodes, currNode, TOP_RESERVE, willCollide, fossilize } = useNodes();

  const position = ref(deepCopy(defaultPosition));
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
          nodes.value[rowIdx + x][colIdx] === currNode.value
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
    position.value = deepCopy(defaultPosition);
    position.value.forEach(([rowIdx, colIdx]) => (nodes.value[rowIdx][colIdx] = currNode.value));
  }

  function fall() {
    let isBlocked = false;
    for (let i = 0; i < nextPosition.value.length; i++) {
      const [nextRowIdx, nextColIdx] = nextPosition.value[i];
      if (
        nodes.value[nextRowIdx][nextColIdx] === NODE.BIRTH ||
        nodes.value[nextRowIdx][nextColIdx] === NODE.VOID ||
        nodes.value[nextRowIdx][nextColIdx] === currNode.value
      )
        continue;
      isBlocked = true;
      break;
    }
    if (isBlocked) {
      position.value.forEach(fossilize);
      return false;
    }
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
    });
    nextPosition.value.forEach(([nextRowIdx, nextColIdx]) => {
      nodes.value[nextRowIdx][nextColIdx] = currNode.value;
    });

    position.value = nextPosition.value;
    return true;
  }

  function moveRight() {
    const positionCandidate = position.value.map(([rowIdx, colIdx]) => [rowIdx, colIdx + 1]);
    if (willCollide(positionCandidate)) return;
    position.value.forEach(([rowIdx, colIdx], i) => {
      nodes.value[rowIdx][colIdx] = rowIdx <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID;
      position.value[i] = [rowIdx, colIdx + 1];
    });
    position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = currNode.value;
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
      nodes.value[rowIdx][colIdx] = currNode.value;
    });
  }

  return { position, nextPosition, endPosition, prepare, fall, moveRight, moveLeft };
}

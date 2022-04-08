import { randArrayElements } from '~/libs/random';
import { NODE } from './@types';
import { useGameInfo } from './useGameInfo';

const { increaseScore } = useGameInfo();

const X_SIZE = 12;
const Y_SIZE = 28;
const TOP_RESERVE = 4;

const nodes = ref<NODE[][]>(generateCleanTemplate());

function generateCleanTemplate(): NODE[][] {
  return Array.from({ length: Y_SIZE }, (_, i) =>
    i === Y_SIZE - 1
      ? Array.from({ length: X_SIZE }, () => NODE.WALL)
      : Array.from({ length: X_SIZE }, (_, j) =>
          j === 0 || j === X_SIZE - 1 ? NODE.WALL : i <= TOP_RESERVE - 1 ? NODE.BIRTH : NODE.VOID,
        ),
  );
}

const currNode = ref<NODE>(randomTetromino());
const nextNode = ref<NODE>(randomTetromino());

function randomTetromino() {
  return randArrayElements(1, [NODE.I, NODE.J, NODE.L, NODE.O, NODE.S, NODE.Z, NODE.T])[0];
}

function switchNode() {
  currNode.value = nextNode.value;
  nextNode.value = randomTetromino();
}

function willCollide(position: number[][]) {
  for (let i = 0; i < position.length; i++) {
    const [rowIdx, colIdx] = position[i];
    if (
      nodes.value[rowIdx][colIdx] !== NODE.VOID &&
      nodes.value[rowIdx][colIdx] !== NODE.BIRTH &&
      nodes.value[rowIdx][colIdx] !== currNode.value
    )
      return true;
  }
  return false;
}

function fossilize([rowIdx, colIdx]: number[]) {
  switch (currNode.value) {
    case NODE.I:
      nodes.value[rowIdx][colIdx] = NODE.FOSSIL_I;
      break;
    case NODE.J:
      nodes.value[rowIdx][colIdx] = NODE.FOSSIL_J;
      break;
    case NODE.L:
      nodes.value[rowIdx][colIdx] = NODE.FOSSIL_L;
      break;
    case NODE.O:
      nodes.value[rowIdx][colIdx] = NODE.FOSSIL_O;
      break;
    case NODE.S:
      nodes.value[rowIdx][colIdx] = NODE.FOSSIL_S;
      break;
    case NODE.T:
      nodes.value[rowIdx][colIdx] = NODE.FOSSIL_T;
      break;
    case NODE.Z:
      nodes.value[rowIdx][colIdx] = NODE.FOSSIL_Z;
      break;
  }
}

function removeNodes() {
  const targetRowIdxs: number[] = [];
  nodes.value.forEach((row, rowIdx) => {
    if (row.every((node) => node === NODE.WALL)) return;
    if (
      row.every(
        (node) =>
          node === NODE.FOSSIL_I ||
          node === NODE.FOSSIL_J ||
          node === NODE.FOSSIL_L ||
          node === NODE.FOSSIL_O ||
          node === NODE.FOSSIL_S ||
          node === NODE.FOSSIL_T ||
          node === NODE.FOSSIL_Z ||
          node === NODE.WALL,
      )
    )
      targetRowIdxs.push(rowIdx);
  });
  if (targetRowIdxs.length === 0) return;
  increaseScore(targetRowIdxs.length);
  nodes.value = nodes.value.filter((_, rowIdx) => !targetRowIdxs.includes(rowIdx));
  nodes.value = [
    ...nodes.value.slice(0, TOP_RESERVE),
    ...targetRowIdxs.map(() =>
      Array.from({ length: X_SIZE }, (_, j) =>
        j === 0 || j === X_SIZE - 1 ? NODE.WALL : NODE.VOID,
      ),
    ),
    ...nodes.value.slice(TOP_RESERVE),
  ];
}

export function useNodes() {
  return {
    nodes,
    TOP_RESERVE,
    currNode,
    nextNode,
    willCollide,
    removeNodes,
    switchNode,
    fossilize,
    X_SIZE,
    Y_SIZE,
  };
}

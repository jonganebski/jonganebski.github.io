import { randArrayElements } from '~/libs/random';

enum NODE {
  WALL = 0,
  BIRTH,
  VOID,
  FOSSIL_I,
  FOSSIL_J,
  FOSSIL_L,
  FOSSIL_O,
  FOSSIL_S,
  FOSSIL_T,
  FOSSIL_Z,
  I,
  J,
  L,
  O,
  S,
  T,
  Z,
}

const NODE_SIZE = 30;
const X_SIZE = 9;
const Y_SIZE = 20;
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
  return randArrayElements(1, [NODE.I, NODE.FOSSIL_O])[0];
}

function switchNode() {
  currNode.value = nextNode.value;
  nextNode.value = randomTetromino();
}

export function useNodes() {
  return {
    nodes,
    NODE_SIZE,
    TOP_RESERVE,
    NODE,
    currNode,
    nextNode,
    switchNode,
    X_SIZE,
    Y_SIZE,
  };
}

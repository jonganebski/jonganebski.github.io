import { useNodes } from './useNodes';
import { NODE } from './@types';
import type { UseTetrominoResult } from './@types';

export function useController(ts: UseTetrominoResult[]) {
  const { removeNodes, switchNode, fossilize, TOP_RESERVE, currNode, nodes } = useNodes();

  const defaultSetTimeoutMs = 700;
  let setTimeoutId: NodeJS.Timeout;
  const setTimeoutMs = ref(defaultSetTimeoutMs);

  function tetromino() {
    const t = ts.find(({ id }) => id === currNode.value);
    if (!t) throw Error('Tetromino not found');
    return t;
  }

  function startGame() {
    tetromino().prepare();
    fall();
  }

  function fall() {
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => {
      if (!tetromino().fall()) {
        clearTimeout(setTimeoutId);
        removeNodes();
        if (!validate()) {
          window.alert('Game Over!');
          return;
        }
        switchNode();
        tetromino().prepare();
      }
      fall();
    }, setTimeoutMs.value);
  }

  function validate() {
    const target = tetromino().position.value;
    for (let i = 0; i < target.length; i++) {
      const [rowIdx] = target[i];
      if (rowIdx < TOP_RESERVE) return false;
    }
    return true;
  }

  function rotateTetromino(e: KeyboardEvent) {
    e.preventDefault();
    tetromino().changeShape();
  }

  function moveTetrominoToRight(e: KeyboardEvent) {
    e.preventDefault();
    tetromino().moveRight();
  }

  function moveTetrominoToLeft(e: KeyboardEvent) {
    e.preventDefault();
    tetromino().moveLeft();
  }

  function moveTetrominoDown(e: KeyboardEvent) {
    e.preventDefault();
    setTimeoutMs.value = 0;
    fall();
    setTimeoutMs.value = defaultSetTimeoutMs;
  }

  function dropTetromino(e: KeyboardEvent) {
    e.preventDefault();
    clearTimeout(setTimeoutId);
    tetromino().position.value.forEach(([rowIdx, colIdx]) => {
      nodes.value[rowIdx][colIdx] = NODE.VOID;
    });
    tetromino().endPosition.value.forEach(([rowIdx, colIdx], i) => {
      fossilize([rowIdx, colIdx]);
      tetromino().position.value[i][0] = rowIdx;
      tetromino().position.value[i][1] = colIdx;
    });
    removeNodes();
    if (!validate()) {
      window.alert('Game Over!');
      return;
    }
    switchNode();
    tetromino().prepare();
    fall();
  }

  return {
    startGame,
    fall,
    validate,
    tetromino,
    rotateTetromino,
    moveTetrominoToRight,
    moveTetrominoToLeft,
    moveTetrominoDown,
    dropTetromino,
  };
}

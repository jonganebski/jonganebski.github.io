import { useNodes } from './useNodes';
import { NODE } from './@types';
import { useI } from './useI';
import { useJ } from './useJ';
import { useL } from './useL';
import { useO } from './useO';
import { useS } from './useS';
import { useT } from './useT';
import { useZ } from './useZ';

export function useController() {
  const { removeNodes, switchNode, fossilize, TOP_RESERVE, currNode, nodes } = useNodes();

  const I = useI();
  const J = useJ();
  const L = useL();
  const O = useO();
  const S = useS();
  const Z = useZ();
  const T = useT();

  const defaultSetTimeoutMs = 700;
  let setTimeoutId: NodeJS.Timeout;
  const setTimeoutMs = ref(defaultSetTimeoutMs);

  function tetromino() {
    const t = [I, J, L, O, S, Z, T].find(({ id }) => id === currNode.value);
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

  function isGuide(rowIdx: number, colIdx: number) {
    return tetromino().endPosition.value.find(([r, c]) => r === rowIdx && c === colIdx);
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
    isGuide,
  };
}

import { useNodes } from './useNodes';
import { NODE } from './@types';
import { useI } from './useI';
import { useJ } from './useJ';
import { useL } from './useL';
import { useO } from './useO';
import { useS } from './useS';
import { useT } from './useT';
import { useZ } from './useZ';
import { useGameInfo } from './useGameInfo';

export function useController() {
  const { removeNodes, switchNode, fossilize, TOP_RESERVE, currNode, nodes } = useNodes();
  const { isGameStarted, isGameFinished, setTimeoutMs, computeSetTimeoutMs } = useGameInfo();

  const I = useI();
  const J = useJ();
  const L = useL();
  const O = useO();
  const S = useS();
  const Z = useZ();
  const T = useT();

  let setTimeoutId: NodeJS.Timeout;

  function tetromino() {
    const t = [I, J, L, O, S, Z, T].find(({ id }) => id === currNode.value);
    if (!t) throw Error('Tetromino not found');
    return t;
  }

  function startGame() {
    isGameStarted.value = true;
    tetromino().prepare();
    fall();
  }

  function finishGame() {
    isGameFinished.value = true;
    window.alert('Game Over!');
  }

  function fall() {
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => {
      if (!tetromino().fall()) {
        clearTimeout(setTimeoutId);
        removeNodes();
        if (!validate()) return finishGame();
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

  function rotateTetromino(e: Event) {
    if (!isGameStarted.value || isGameFinished.value) return;
    e.preventDefault();
    tetromino().changeShape();
  }

  function moveTetrominoToRight(e: Event) {
    if (!isGameStarted.value || isGameFinished.value) return;
    e.preventDefault();
    tetromino().moveRight();
  }

  function moveTetrominoToLeft(e: Event) {
    if (!isGameStarted.value || isGameFinished.value) return;
    e.preventDefault();
    tetromino().moveLeft();
  }

  function moveTetrominoDown(e: Event) {
    if (!isGameStarted.value || isGameFinished.value) return;
    e.preventDefault();
    setTimeoutMs.value = 0;
    fall();
    setTimeoutMs.value = computeSetTimeoutMs();
  }

  function dropTetromino(e: Event) {
    if (!isGameStarted.value || isGameFinished.value) return;
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
    if (!validate()) return finishGame();
    switchNode();
    tetromino().prepare();
    fall();
  }

  function isGuide(rowIdx: number, colIdx: number) {
    if (!isGameStarted.value || isGameFinished.value) return;
    return tetromino().endPosition.value.find(([r, c]) => r === rowIdx && c === colIdx);
  }

  return {
    moveTetrominoToRight,
    moveTetrominoToLeft,
    moveTetrominoDown,
    rotateTetromino,
    dropTetromino,
    startGame,
    tetromino,
    validate,
    isGuide,
    fall,
  };
}

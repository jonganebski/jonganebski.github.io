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
  const { TOP_RESERVE, currNode, nodes, removeNodes, switchNode, fossilize, resetUseNodes } =
    useNodes();
  const { gameStatus, setTimeoutMs, computeSetTimeoutMs, resetGameInfo } = useGameInfo();

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
    tetromino().prepare();
    fall();
    gameStatus.value = 'PLAYING';
  }

  function finishGame() {
    window.alert('Game Over!');
    gameStatus.value = 'END';
  }

  function resetGame() {
    resetUseNodes();
    resetGameInfo();
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
    if (gameStatus.value !== 'PLAYING') return;
    e.preventDefault();
    tetromino().changeShape();
  }

  function moveTetrominoToRight(e: Event) {
    if (gameStatus.value !== 'PLAYING') return;
    e.preventDefault();
    tetromino().moveRight();
  }

  function moveTetrominoToLeft(e: Event) {
    if (gameStatus.value !== 'PLAYING') return;
    e.preventDefault();
    tetromino().moveLeft();
  }

  function moveTetrominoDown(e: Event) {
    if (gameStatus.value !== 'PLAYING') return;
    e.preventDefault();
    setTimeoutMs.value = 0;
    fall();
    setTimeoutMs.value = computeSetTimeoutMs();
  }

  function dropTetromino(e: Event) {
    if (gameStatus.value !== 'PLAYING') return;
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
    if (gameStatus.value !== 'PLAYING') return;
    return tetromino().endPosition.value.find(([r, c]) => r === rowIdx && c === colIdx);
  }

  return {
    moveTetrominoToRight,
    moveTetrominoToLeft,
    moveTetrominoDown,
    rotateTetromino,
    dropTetromino,
    resetGame,
    startGame,
    tetromino,
    validate,
    isGuide,
    fall,
  };
}

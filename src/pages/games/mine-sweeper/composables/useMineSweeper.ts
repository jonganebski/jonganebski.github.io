import { useTimestamp } from '@vueuse/core';
import { useUserQuery } from '~/api/useUserQuery';
import { useCreateMineSweeperRecordMutation } from '../apis/useCreateMineSweeperRecordMutation';
import { useModes } from './useModes';

export function useMineSweeper() {
  class Node {
    public isExploded: boolean;
    public isQuestion: boolean;
    public isFlagged: boolean;
    public isVeiled: boolean;
    public isMine: boolean;
    public hint: number;
    private rowNum: number;
    private colNum: number;

    constructor(payload: { rowNum: number; colNum: number }) {
      this.isExploded = false;
      this.isQuestion = false;
      this.isFlagged = false;
      this.isVeiled = true;
      this.isMine = false;
      this.hint = 0;
      this.rowNum = payload.rowNum;
      this.colNum = payload.colNum;
    }

    increaseHint() {
      this.hint += 1;
    }

    around(fn: keyof Pick<Node, 'unveil' | 'increaseHint'>) {
      // Top
      game.value[this.rowNum - 1]?.[this.colNum]?.[fn]();
      // Top-Right
      game.value[this.rowNum - 1]?.[this.colNum + 1]?.[fn]();
      // Right
      game.value[this.rowNum]?.[this.colNum + 1]?.[fn]();
      // Bottom-Right
      game.value[this.rowNum + 1]?.[this.colNum + 1]?.[fn]();
      // Bottom
      game.value[this.rowNum + 1]?.[this.colNum]?.[fn]();
      // Bottom-Left
      game.value[this.rowNum + 1]?.[this.colNum - 1]?.[fn]();
      // Left
      game.value[this.rowNum]?.[this.colNum - 1]?.[fn]();
      // Top-Left
      game.value[this.rowNum - 1]?.[this.colNum - 1]?.[fn]();
    }

    countAround(property: keyof Pick<Node, 'isFlagged'>) {
      let count = 0;
      // Top
      game.value[this.rowNum - 1]?.[this.colNum]?.[property] && count++;
      // Top-Right
      game.value[this.rowNum - 1]?.[this.colNum + 1]?.[property] && count++;
      // Right
      game.value[this.rowNum]?.[this.colNum + 1]?.[property] && count++;
      // Bottom-Right
      game.value[this.rowNum + 1]?.[this.colNum + 1]?.[property] && count++;
      // Bottom
      game.value[this.rowNum + 1]?.[this.colNum]?.[property] && count++;
      // Bottom-Left
      game.value[this.rowNum + 1]?.[this.colNum - 1]?.[property] && count++;
      // Left
      game.value[this.rowNum]?.[this.colNum - 1]?.[property] && count++;
      // Top-Left
      game.value[this.rowNum - 1]?.[this.colNum - 1]?.[property] && count++;

      return count;
    }

    unveil() {
      if (!this.isVeiled) return;
      if (this.isFlagged) return;
      if (this.isMine) {
        finishGame({ isSuccess: false });
        return;
      }
      this.isVeiled = false;
      if (this.hint !== 0) return;
      this.around('unveil');
    }

    onLeftClick() {
      if (this.isFlagged) return;
      if (this.isQuestion) return;
      this.unveil();
    }

    onDoubleClick() {
      if (this.isVeiled) return;
      const flagCountArount = this.countAround('isFlagged');
      if (flagCountArount !== this.hint) return;
      this.around('unveil');
    }

    onRightClick() {
      if (!this.isVeiled) return;
      if (this.isFlagged) {
        flagCount.value -= 1;
        this.isFlagged = false;
        this.isQuestion = true;
        return;
      }
      if (this.isQuestion) {
        flagCount.value -= 1;
        this.isFlagged = false;
        this.isQuestion = false;
        return;
      }
      flagCount.value += 1;
      this.isFlagged = true;
      this.isQuestion = false;
    }
  }

  const MAX_TIME = 1000 * 999;
  const COLORS = {
    surfaceLight: '#c6c6c6',
    surfaceDark: '#C0C0C0',
    shadow: '#808080',
  };

  const createRecord = useCreateMineSweeperRecordMutation();
  const { data: user } = useUserQuery();

  const { modeId, modeName } = useModes();

  const game = ref<Node[][]>([]);

  const flagCount = ref(0);

  const isGameOver = ref<boolean>(false);
  const isSuccess = ref<boolean>(false);

  const gameStartedAt = ref<number | null>(null);

  const {
    timestamp,
    pause: stopTimer,
    resume: startTimer,
  } = useTimestamp({ immediate: false, controls: true });

  const time = computed(() => (gameStartedAt.value ? timestamp.value - gameStartedAt.value : 0));

  watch(time, () => {
    if (time.value < MAX_TIME) return;
    finishGame({ isSuccess: false });
  });

  const meta = computed(() =>
    modeName.value === 'expert'
      ? { totalMines: 99, rows: 16, cols: 30 }
      : modeName.value === 'intermediate'
      ? { totalMines: 40, rows: 16, cols: 16 }
      : modeName.value === 'beginner'
      ? { totalMines: 10, rows: 9, cols: 9 }
      : { totalMines: 0, rows: 0, cols: 0 },
  );

  watch(
    () => meta.value,
    () => initialize(),
    { immediate: true },
  );

  function initialize() {
    stopTimer();
    gameStartedAt.value = null;
    isGameOver.value = false;
    isSuccess.value = false;
    flagCount.value = 0;
    game.value = [];
    for (let rowNum = 0; rowNum < meta.value.rows; rowNum++) {
      const row: Node[] = [];
      for (let colNum = 0; colNum < meta.value.cols; colNum++) {
        row.push(new Node({ rowNum, colNum }));
      }
      game.value.push(row);
    }

    let minesCount = 0;
    while (minesCount < meta.value.totalMines) {
      const row = Math.round(Math.random() * (meta.value.rows - 1));
      const col = Math.round(Math.random() * (meta.value.cols - 1));
      if (game.value[row][col].isMine) continue;
      game.value[row][col].isMine = true;
      game.value[row][col].around('increaseHint');
      minesCount++;
    }
  }

  function startGame() {
    gameStartedAt.value = new Date().getTime();
    startTimer();
  }

  function finishGame(payload: { isSuccess: boolean }) {
    stopTimer();
    isGameOver.value = true;
    isSuccess.value = payload.isSuccess;
    if (!payload.isSuccess) return explode();
    if (!user.value) return;
    createRecord.mutate(
      { modeId: modeId.value, userId: user.value.id, time: time.value },
      {
        onSuccess: () => {
          window.alert('New Record!');
        },
      },
    );
  }

  function withController(fn: () => void) {
    if (isGameOver.value) return;
    if (!gameStartedAt.value) startGame();
    fn();
    if (meta.value.totalMines !== flagCount.value) return;
    validate() && finishGame({ isSuccess: true });
  }

  function explode() {
    game.value.forEach((row) => {
      row.forEach((node) => {
        if (node.isFlagged) return;
        if (!node.isMine) return;
        node.isExploded = true;
      });
    });
  }

  function validate() {
    for (let rowNum = 0; rowNum < game.value.length; rowNum++) {
      for (let colNum = 0; colNum < game.value[rowNum].length; colNum++) {
        const node = game.value[rowNum][colNum];
        if (node.isMine && node.isFlagged) continue;
        if (!node.isVeiled) continue;
        return false;
      }
    }
    return true;
  }

  return {
    withController,
    initialize,
    isGameOver,
    flagCount,
    isSuccess,
    COLORS,
    game,
    meta,
    time,
  };
}

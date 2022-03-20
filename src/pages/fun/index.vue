<script setup lang="ts">
import { useTimestamp } from '@vueuse/core';

type Mode = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT';

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

  startTimer() {
    gameStartedAt.value = new Date().getTime();
    startTimer();
  }

  finishGame(payload: { isSuccess: boolean }) {
    stopTimer();
    isGameOver.value = true;
    isSuccess.value = payload.isSuccess;
    if (!payload.isSuccess) {
      explode();
    }
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
      this.finishGame({ isSuccess: false });
      return;
    }
    this.isVeiled = false;
    if (this.hint !== 0) return;
    this.around('unveil');
  }

  onLeftClick() {
    if (isGameOver.value) return;
    if (!gameStartedAt.value) this.startTimer();
    if (this.isFlagged) return;
    if (this.isQuestion) return;
    this.unveil();
    if (validate()) {
      this.finishGame({ isSuccess: true });
    }
  }

  onDoubleClick() {
    if (this.isVeiled) return;
    const flagCountArount = this.countAround('isFlagged');
    if (flagCountArount !== this.hint) return;
    this.around('unveil');
    if (validate()) {
      this.finishGame({ isSuccess: true });
    }
  }

  onRightClick() {
    if (isGameOver.value) return;
    if (!gameStartedAt.value) this.startTimer();
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
    if (validate()) {
      this.finishGame({ isSuccess: true });
    }
  }
}

const gameStartedAt = ref<number | null>(null);
const {
  timestamp,
  pause: stopTimer,
  resume: startTimer,
} = useTimestamp({ immediate: false, controls: true });
const time = computed(() => (gameStartedAt.value ? timestamp.value - gameStartedAt.value : 0));

const isGameOver = ref<boolean>(false);
const isSuccess = ref<boolean>(false);
const mode = ref<Mode>('BEGINNER');
const game = ref<Node[][]>([]);
const flagCount = ref(0);

const meta = computed(() =>
  mode.value === 'EXPERT'
    ? { totalMines: 99, rows: 16, cols: 30 }
    : mode.value === 'INTERMEDIATE'
    ? { totalMines: 40, rows: 16, cols: 16 }
    : { totalMines: 10, rows: 9, cols: 9 },
);

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
  if (meta.value.totalMines !== flagCount.value) return;
  let solved = true;
  game.value.forEach((row) => {
    row.forEach((node) => {
      if (node.isMine && node.isFlagged) return;
      if (!node.isVeiled) return;
      solved = false;
    });
  });
  return solved;
}

function onSelectMode(event: Event) {
  const value = (event.target as HTMLSelectElement).value as Mode;
  mode.value = value;
  initialize();
}

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

onMounted(() => {
  initialize();
});

const COLORS = {
  surfaceLight: '#c6c6c6',
  surfaceDark: '#C0C0C0',
  shadow: '#808080',
};
</script>

<template>
  <div class="min-h-screen">
    <div class="mt-10 flex justify-center">
      <select :value="mode" @input="onSelectMode">
        <option value="BEGINNER">BEGINNER</option>
        <option value="INTERMEDIATE">INTERMEDIATE</option>
        <option value="EXPERT">EXPERT</option>
      </select>
    </div>
    <div class="mt-20 flex justify-center">
      <div class="p-2 relief" :class="[`bg-[${COLORS.surfaceDark}]`]">
        <div class="p-2 grid grid-cols-3 intaglio">
          <p>{{ meta.totalMines - flagCount }}</p>
          <div class="flex items-center justify-center">
            <button class="btn relief w-10 h-10" data-isVeiled="true" @click="initialize">
              {{ isGameOver && isSuccess ? '😎' : isGameOver && !isSuccess ? '💀' : '🙂' }}
            </button>
          </div>
          <p>
            {{
              Math.round(time / 1000)
                .toString()
                .padStart(3, '0')
            }}
          </p>
        </div>
        <div
          class="mt-3 grid gap-px text-xl intaglio"
          :class="[`bg-[${COLORS.shadow}]`]"
          :style="{ gridTemplateRows: `repeat(${meta.rows}, 40px)` }"
        >
          <div
            v-for="(row, index) in game"
            :key="index"
            class="grid gap-px"
            :style="{ gridTemplateColumns: `repeat(${meta.cols}, 40px)` }"
          >
            <button
              v-for="(node, index) in row"
              :key="index"
              class="btn"
              :class="[node.isVeiled ? 'relief' : '']"
              :data-isVeiled="node.isVeiled"
              @contextmenu.prevent="() => node.onRightClick()"
              @dblclick.prevent="() => node.onDoubleClick()"
              @click.prevent="() => node.onLeftClick()"
            >
              <span
                v-if="!node.isVeiled"
                class="font-extrabold"
                :class="[
                  node.hint === 1
                    ? 'text-blue-700'
                    : node.hint === 2
                    ? 'text-green-700'
                    : 'text-red-700',
                ]"
                >{{ node.hint === 0 ? '' : node.hint }}</span
              >
              <span v-if="node.isExploded">💣</span>
              <carbon-flag v-if="node.isFlagged" />
              <carbon-help v-if="node.isQuestion" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind('COLORS.surfaceLight');
}
.relief {
  border-top: 4px solid white;
  border-left: 4px solid white;
  border-bottom: 4px solid v-bind('COLORS.shadow');
  border-right: 4px solid v-bind('COLORS.shadow');
}
button.relief:active {
  border: 4px solid transparent;
}
.intaglio {
  border-bottom: 4px solid white;
  border-right: 4px solid white;
  border-top: 4px solid v-bind('COLORS.shadow');
  border-left: 4px solid v-bind('COLORS.shadow');
}
</style>

<script setup lang="ts">
import { useTimestamp } from '@vueuse/core';
import { useCreateMineSweeperRecordMutation } from '~/api/useCreateMineSweeperRecordMutation';
import { useMineSweeperRecordsQuery } from '~/api/useMineSweeperRecordsQuery';
import { useModesQuery } from '~/api/useModesQuery';
import { useUserQuery } from '~/api/useUserQuery';
import { useMyI18n } from '~/plugins/i18n';

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

const { data: user } = useUserQuery();
const { data: modes, findModeById } = useModesQuery('mine-sweeper-modes');
const createRecord = useCreateMineSweeperRecordMutation();

const { t } = useMyI18n();

const gameStartedAt = ref<number | null>(null);
const {
  timestamp,
  pause: stopTimer,
  resume: startTimer,
} = useTimestamp({ immediate: false, controls: true });
const time = computed(() => (gameStartedAt.value ? timestamp.value - gameStartedAt.value : 0));
const MAX_TIME = 1000 * 999;

watch(time, () => {
  if (time.value < MAX_TIME) return;
  finishGame({ isSuccess: false });
});

const isGameOver = ref<boolean>(false);
const isSuccess = ref<boolean>(false);
const modeId = ref<number>(1);
const modeName = computed(() => findModeById(modeId.value));
const game = ref<Node[][]>([]);
const flagCount = ref(0);

const { data: records } = useMineSweeperRecordsQuery(modeId);

const meta = computed(() =>
  modeName.value === 'expert'
    ? { totalMines: 99, rows: 16, cols: 30 }
    : modeName.value === 'intermediate'
    ? { totalMines: 40, rows: 16, cols: 16 }
    : { totalMines: 10, rows: 9, cols: 9 },
);

function withController(fn: () => void) {
  if (isGameOver.value) return;
  if (!gameStartedAt.value) startGame();
  fn();
  if (meta.value.totalMines !== flagCount.value) return;
  validate() && finishGame({ isSuccess: true });
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

function onSelectMode(value: string | number) {
  modeId.value = Number(value);
  initialize();
}

function getHintColor(hint: number) {
  return hint === 1
    ? 'text-blue-700'
    : hint === 2
    ? 'text-green-700'
    : hint === 3
    ? 'text-red-700'
    : hint === 4
    ? 'text-purple-700'
    : hint === 5
    ? 'text-fuchsia-700'
    : hint === 6
    ? 'text-cyan-600'
    : 'text-black';
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
      <ui-select :model-value="modeId" :label="t('mode')" @update:model-value="onSelectMode">
        <ui-option
          v-for="mode in modes"
          :key="mode.id"
          :value="mode.id"
          :label="mode.mode.toUpperCase()"
        />
      </ui-select>
    </div>
    <div class="mt-20 flex flex-col items-center justify-center game" @contextmenu.prevent>
      <div class="p-2 relief" :style="{ backgroundColor: COLORS.surfaceDark }">
        <div class="p-2 grid grid-cols-3 intaglio">
          <div class="flex">
            <span class="counter">
              {{ (meta.totalMines - flagCount).toString().padStart(3, '0') }}
            </span>
          </div>
          <div class="flex items-center justify-center">
            <button
              class="node-btn relief player w-10 h-10"
              :data-isGameOver="isGameOver"
              aria-label="Click to restart the game"
              @click="initialize"
            >
              {{ isGameOver && isSuccess ? '😎' : isGameOver && !isSuccess ? '💀' : '' }}
            </button>
          </div>
          <div class="flex justify-end">
            <span class="counter">
              {{
                Math.round(time / 1000)
                  .toString()
                  .padStart(3, '0')
              }}
            </span>
          </div>
        </div>
        <div class="rows-container intaglio">
          <div v-for="(row, index) in game" :key="index" class="row">
            <button
              v-for="(node, index) in row"
              :key="index"
              class="node-btn"
              :class="[node.isVeiled && 'relief']"
              :data-isExploded="node.isExploded"
              @contextmenu.prevent="() => withController(() => node.onRightClick())"
              @dblclick.prevent="() => withController(() => node.onDoubleClick())"
              @click.prevent="() => withController(() => node.onLeftClick())"
            >
              <span v-if="!node.isVeiled" class="font-extrabold" :class="[getHintColor(node.hint)]">
                {{ node.hint === 0 ? '' : node.hint }}
              </span>
              <span v-if="node.isExploded">💣</span>
              <carbon-flag v-if="node.isFlagged" />
              <carbon-help v-if="node.isQuestion" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="!user" class="mt-2 w-96 text-rose-300 text-sm">{{ t('games_auth_warning') }}</div>
    </div>
    <table class="mt-10 mx-auto text-sm">
      <thead>
        <tr>
          <th class="pr-6"><carbon-list-numbered class="mx-auto" /></th>
          <th class="px-8 w-48"><carbon-user class="mx-auto" /></th>
          <th class="px-8"><carbon-time class="mx-auto" /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="record.id">
          <td class="py-2 pr-6 text-center">
            {{ index + 1 }}
          </td>
          <td class="py-2">
            <div class="flex items-center gap-3">
              <div class="relative">
                <ui-lazy-image
                  :src="record.user.avatar_url ?? ''"
                  :width="40"
                  :height="40"
                  class="rounded-full"
                />
                <span v-if="index + 1 <= 3" class="absolute top-0 right-0 text-xl">
                  {{
                    index + 1 === 1 ? '🥇' : index + 1 === 2 ? '🥈' : index + 1 === 3 ? '🥉' : ''
                  }}
                </span>
              </div>
              <span class="w-48 truncate"> {{ record.user.user_name }}lknasihweknefweknwvj </span>
            </div>
          </td>
          <td class="py-2 text-right">{{ (record.time / 1000).toFixed(2) }} sec</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="css">
.game:active .player[data-isGameOver='false']:before {
  content: '😲';
}
.player[data-isGameOver='false']:before {
  content: '🙂';
}
.counter {
  height: 100%;
  min-width: 4ch;
  background-color: black;
  text-align: center;
  color: red;
  font-size: 26px;
}
.rows-container {
  margin-top: 0.75rem;
  display: grid;
  gap: 1px;
  grid-template-rows: repeat(v-bind('meta.rows'), 40px);
  background-color: v-bind('COLORS.shadow');
}
.row {
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(v-bind('meta.cols'), 40px);
}
.node-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 32px;
  background-color: v-bind('COLORS.surfaceLight');
}
.node-btn[data-isExploded='true'] {
  background-color: red;
  border: none;
}
.relief {
  border-top: 4px solid white;
  border-left: 4px solid white;
  border-bottom: 4px solid v-bind('COLORS.shadow');
  border-right: 4px solid v-bind('COLORS.shadow');
}
button.relief:active {
  border: 4px solid v-bind('COLORS.shadow');
}
.intaglio {
  border-bottom: 4px solid white;
  border-right: 4px solid white;
  border-top: 4px solid v-bind('COLORS.shadow');
  border-left: 4px solid v-bind('COLORS.shadow');
}
</style>
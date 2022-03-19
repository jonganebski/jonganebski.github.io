<script setup lang="ts">
class Node {
  public isQuestion: boolean;
  public isFlagged: boolean;
  public isVeiled: boolean;
  public isMine: boolean;
  private rowNum: number;
  private colNum: number;

  constructor(payload: { rowNum: number; colNum: number }) {
    this.isQuestion = false;
    this.isFlagged = false;
    this.isVeiled = true;
    this.isMine = false;
    this.rowNum = payload.rowNum;
    this.colNum = payload.colNum;
  }

  computeHint(): string {
    let hint = 0;
    // Top
    if (game.value[this.rowNum - 1]?.[this.colNum]?.isMine) hint++;
    // Top-Right
    if (game.value[this.rowNum - 1]?.[this.colNum + 1]?.isMine) hint++;
    // Right
    if (game.value[this.rowNum]?.[this.colNum + 1]?.isMine) hint++;
    // Bottom-Right
    if (game.value[this.rowNum + 1]?.[this.colNum + 1]?.isMine) hint++;
    // Bottom
    if (game.value[this.rowNum + 1]?.[this.colNum]?.isMine) hint++;
    // Bottom-Left
    if (game.value[this.rowNum + 1]?.[this.colNum - 1]?.isMine) hint++;
    // Left
    if (game.value[this.rowNum]?.[this.colNum - 1]?.isMine) hint++;
    // Top-Left
    if (game.value[this.rowNum - 1]?.[this.colNum - 1]?.isMine) hint++;
    return hint ? hint.toString() : '';
  }

  startGame() {
    gameStartedAt.value = new Date().getTime();
  }

  finishGame({ isSuccess }: { isSuccess: boolean }) {}

  onLeftClick() {
    if (!gameStartedAt.value) this.startGame();
    if (this.isFlagged) return;
    if (this.isQuestion) return;
    if (this.isMine) {
      this.finishGame({ isSuccess: false });
      return;
    }
    this.isVeiled = false;
  }

  onRightClick() {
    if (!gameStartedAt.value) this.startGame();
    if (!this.isVeiled) return;
    if (this.isFlagged) {
      this.isFlagged = false;
      this.isQuestion = true;
      return;
    }
    if (this.isQuestion) {
      this.isFlagged = false;
      this.isQuestion = false;
      return;
    }
    this.isFlagged = true;
    this.isQuestion = false;
  }
}

const gameStartedAt = ref<number | null>(null);
const isGameOver = ref<boolean>(false);
const mode = ref<'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'>('BEGINNER');
const game = ref<Node[][]>([]);

const meta = computed(() =>
  mode.value === 'EXPERT'
    ? { totalMines: 99, rows: 16, cols: 30 }
    : mode.value === 'INTERMEDIATE'
    ? { totalMines: 40, rows: 16, cols: 16 }
    : { totalMines: 10, rows: 9, cols: 9 },
);

onMounted(() => {
  const bluePrint: Node[][] = [];
  for (let rowNum = 0; rowNum < meta.value.rows; rowNum++) {
    const row: Node[] = [];
    for (let colNum = 0; colNum < meta.value.cols; colNum++) {
      row.push(new Node({ rowNum, colNum }));
    }
    bluePrint.push(row);
  }

  let minesCount = 0;
  while (minesCount <= meta.value.totalMines) {
    const row = Math.round(Math.random() * (meta.value.rows - 1));
    const col = Math.round(Math.random() * (meta.value.cols - 1));
    if (bluePrint[row][col].isMine) continue;
    bluePrint[row][col].isMine = true;
    minesCount++;
  }

  game.value = bluePrint;
});
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <div class="m">
      <div v-for="(row, index) in game" :key="index" class="row">
        <div
          v-for="(node, index) in row"
          :key="index"
          :class="[
            node.isVeiled ? 'bg-gray-500' : 'bg-transparent',
            'flex items-center justify-center text-base',
          ]"
          @click.prevent="() => node.onLeftClick()"
          @contextmenu.prevent="() => node.onRightClick()"
        >
          <span v-if="!node.isVeiled">{{ node.computeHint() }}</span>
          <span v-else>{{ node.isMine ? '💣' : '' }}</span>
          <carbon-flag v-if="node.isFlagged" />
          <carbon-help v-if="node.isQuestion" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
.m {
  display: grid;
  grid-template-rows: repeat(9, 40px);
  font-size: 0.5rem;
}
.row {
  display: grid;
  grid-template-columns: repeat(9, 40px);
}
</style>

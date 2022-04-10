const gameStatus = ref<'READY' | 'PLAYING' | 'END'>('READY');

const isCatHere = ref(false);

const destroyedRawsCount = ref(0);

const score = ref(0);

const level = computed(() => Math.floor(destroyedRawsCount.value / 10) + 1);

watch(level, () => {
  setTimeoutMs.value = computeSetTimeoutMs();
});

const setTimeoutMs = ref(computeSetTimeoutMs());

function computeSetTimeoutMs() {
  return Math.max(80, 500 - (level.value - 1) * 30);
}

function resetGameInfo() {
  destroyedRawsCount.value = 0;
  setTimeoutMs.value = computeSetTimeoutMs();
  isCatHere.value = false;
  score.value = 0;
  gameStatus.value = 'READY';
}

function increaseScore(rowsCount: number) {
  let s = 0;
  destroyedRawsCount.value += rowsCount;
  if (rowsCount === 1) s = 40;
  else if (rowsCount === 2) s = 100;
  else if (rowsCount === 3) s = 300;
  else s = 1200;
  if (isCatHere.value) s * 1.5;
  score.value += s;
}

export function useGameInfo() {
  return {
    destroyedRawsCount,
    setTimeoutMs,
    gameStatus,
    isCatHere,
    level,
    score,
    computeSetTimeoutMs,
    resetGameInfo,
    increaseScore,
  };
}

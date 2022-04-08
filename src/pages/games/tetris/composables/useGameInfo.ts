const isGameStarted = ref(false);
const isGameFinished = ref<boolean>(false);

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

function increaseScore(rowsCount: number) {
  destroyedRawsCount.value += rowsCount;
  if (rowsCount === 1) return (score.value += 40);
  if (rowsCount === 2) return (score.value += 100);
  if (rowsCount === 3) return (score.value += 300);
  return (score.value += 1200);
}

export function useGameInfo() {
  return {
    isGameStarted,
    isGameFinished,
    setTimeoutMs,
    computeSetTimeoutMs,
    increaseScore,
    score,
    level,
  };
}

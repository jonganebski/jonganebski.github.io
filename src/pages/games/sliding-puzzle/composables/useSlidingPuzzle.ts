import { breakpointsTailwind } from '@vueuse/core';
import { useIssueModal } from '~/libs/issue';
import { randArrayElements } from '~/libs/random';
import { useMyI18n } from '~/plugins/i18n';
import { useCreateRecordMutation } from '../apis/useCreateRecordMutation';

type Direction = 'top' | 'bottom' | 'right' | 'left';

export function useSlidingPuzzle() {
  const SIZE_X = 5;
  const SIZE_Y = 5;
  const SHUFFLE_COUNT = SIZE_X * SIZE_Y * 2;

  const status = ref<'shuffle' | 'ready' | 'playing' | 'done'>('shuffle');

  const breakpoints = useBreakpoints(breakpointsTailwind);
  const smAndLarger = breakpoints.greater('sm');
  const lgAndLarger = breakpoints.greater('lg');
  const nodeSize = computed(() => (lgAndLarger.value ? 140 : smAndLarger.value ? 100 : 60));

  const createRecord = useCreateRecordMutation();
  const { openIssueModal } = useIssueModal();
  const { t } = useMyI18n();

  const clicksCount = ref(0);
  const gameStartedAt = ref<number | null>(null);
  const gameFinishedAt = ref<number | null>(null);
  const time = computed(() =>
    !gameStartedAt.value || !gameFinishedAt.value
      ? null
      : gameFinishedAt.value - gameStartedAt.value,
  );
  const score = computed(() =>
    !time.value ? null : clicksCount.value + Math.floor(time.value / 1_000),
  );

  const nodes = ref([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 3, 4, 5, 0],
    [0, 6, 7, 8, 9, 10, 0],
    [0, 11, 12, 13, 14, 15, 0],
    [0, 16, 17, 18, 19, 20, 0],
    [0, 21, 22, 23, 24, 25, 0],
    [0, 0, 0, 0, 0, -1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  onMounted(async () => initialize());

  function getRandomNodeAround(rowIdx: number, colIdx: number, prevNode?: number) {
    let result: number[] = [];
    const top = nodes.value[rowIdx - 1][colIdx];
    const bottom = nodes.value[rowIdx + 1][colIdx];
    const right = nodes.value[rowIdx][colIdx + 1];
    const left = nodes.value[rowIdx][colIdx - 1];
    if (0 < top && top !== prevNode) result.push(top);
    if (0 < bottom && bottom !== prevNode) result.push(bottom);
    if (0 < right && right !== prevNode) result.push(right);
    if (0 < left && left !== prevNode) result.push(left);
    if (prevNode) {
      result = result.filter((node) => node !== 25);
    }
    return randArrayElements(1, result)[0];
  }

  async function initialize() {
    gameStartedAt.value = null;
    gameFinishedAt.value = null;
    nodes.value = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 1, 2, 3, 4, 5, 0],
      [0, 6, 7, 8, 9, 10, 0],
      [0, 11, 12, 13, 14, 15, 0],
      [0, 16, 17, 18, 19, 20, 0],
      [0, 21, 22, 23, 24, 25, 0],
      [0, 0, 0, 0, 0, -1, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];
    await nextTick();
    clicksCount.value = 0;
    status.value = 'shuffle';
    let prevNode;
    for (let i = 0; i < SHUFFLE_COUNT; i++) {
      const voidEl = document.getElementById('void') as HTMLDivElement | null;
      if (!voidEl) return;
      const rowIdx = Number(voidEl.dataset.rowidx);
      const colIdx = Number(voidEl.dataset.colidx);
      const node = getRandomNodeAround(rowIdx, colIdx, prevNode);
      const el = document.getElementById(node.toString()) as HTMLDivElement | null;
      if (!el) return;
      await switchNode(el, Number(el.dataset.rowidx), Number(el.dataset.colidx), false);
      prevNode = node;
    }
    status.value = 'ready';
  }

  function validate() {
    const lastNode = SIZE_X * SIZE_Y;
    let value = 0;
    for (let i = 0; i < nodes.value.length; i++) {
      for (let j = 0; j < nodes.value[i].length; j++) {
        const element = nodes.value[i][j];
        if (element === 0) continue;
        if (value === lastNode && element === -1) return true;
        if (value + 1 !== element) return false;
        value++;
      }
    }
    return true;
  }

  async function switchNode(
    node: HTMLDivElement,
    rowIdx: number,
    colIdx: number,
    transition = true,
  ) {
    const direction = getDirection(rowIdx, colIdx);
    if (transition) node.style.transition = 'transform linear 0.1s';
    if (direction === 'top') {
      if (transition) {
        node.style.transform = `translateY(-${nodeSize.value}px)`;
        await sleep(100);
      }
      [nodes.value[rowIdx][colIdx], nodes.value[rowIdx - 1][colIdx]] = [
        nodes.value[rowIdx - 1][colIdx],
        nodes.value[rowIdx][colIdx],
      ];
    }
    if (direction === 'bottom') {
      if (transition) {
        node.style.transform = `translateY(${nodeSize.value}px)`;
        await sleep(100);
      }
      [nodes.value[rowIdx][colIdx], nodes.value[rowIdx + 1][colIdx]] = [
        nodes.value[rowIdx + 1][colIdx],
        nodes.value[rowIdx][colIdx],
      ];
    }
    if (direction === 'right') {
      if (transition) {
        node.style.transform = `translateX(${nodeSize.value}px)`;
        await sleep(100);
      }
      [nodes.value[rowIdx][colIdx], nodes.value[rowIdx][colIdx + 1]] = [
        nodes.value[rowIdx][colIdx + 1],
        nodes.value[rowIdx][colIdx],
      ];
    }
    if (direction === 'left') {
      if (transition) {
        node.style.transform = `translateX(-${nodeSize.value}px)`;
        await sleep(100);
      }
      [nodes.value[rowIdx][colIdx], nodes.value[rowIdx][colIdx - 1]] = [
        nodes.value[rowIdx][colIdx - 1],
        nodes.value[rowIdx][colIdx],
      ];
    }
    if (transition) node.style.transition = '';
    return direction ? true : false;
  }

  async function sleep(milliseconds: number) {
    await new Promise((resolve) => setTimeout(() => resolve(true), milliseconds));
  }

  function getDirection(rowIdx: number, colIdx: number): Direction | null {
    return nodes.value[rowIdx - 1][colIdx] === -1
      ? 'top'
      : nodes.value[rowIdx + 1][colIdx] === -1
      ? 'bottom'
      : nodes.value[rowIdx][colIdx + 1] === -1
      ? 'right'
      : nodes.value[rowIdx][colIdx - 1] === -1
      ? 'left'
      : null;
  }
  async function onClickNode(e: MouseEvent, rowIdx: number, colIdx: number) {
    if (status.value === 'shuffle' || status.value === 'done') return;
    const node = e.currentTarget as HTMLDivElement;
    if (!node) return;
    if (!(await switchNode(node, rowIdx, colIdx))) return;
    if (!gameStartedAt.value) gameStartedAt.value = new Date().getTime();
    clicksCount.value += 1;
    if (status.value === 'ready') status.value = 'playing';
    if (!validate()) return;
    status.value = 'done';
    gameFinishedAt.value = new Date().getTime();
    if (!score.value) return;
    console.log(score.value);
    createRecord.mutate(
      { score: score.value },
      {
        onError: () =>
          openIssueModal({
            title: t('record_mutation_failed.title'),
            content: t('record_mutation_failed.content'),
          }),
      },
    );
  }

  function computeBgPosition(node: number) {
    const x = ((node - 1) % SIZE_X) * nodeSize.value * -1;
    const y = Math.floor((node - 1) / SIZE_Y) * nodeSize.value * -1;
    const t = `${x}px ${y}px`;
    return t;
  }

  return {
    SHUFFLE_COUNT,
    nodeSize,
    SIZE_X,
    SIZE_Y,
    clicksCount,
    status,
    nodes,
    score,
    time,
    computeBgPosition,
    onClickNode,
    initialize,
  };
}

<script setup lang="ts">
import { Head } from '@vueuse/head';
import { useMyI18n } from '~/plugins/i18n';
import AuthWarning from '../components/auth-warning.vue';
import Records from '../components/records.vue';
import { useRecordsQuery } from './apis/useRecordsQuery';
import { useMineSweeper } from './composables/useMineSweeper';
import { useModes } from './composables/useModes';

const router = useRouter();
const route = useRoute();

const { selectedMode, modes } = useModes();

const { data: records, isLoading: isRecordsLoading } = useRecordsQuery(selectedMode);

const { COLORS, isGameOver, isSuccess, flagCount, initialize, meta, game, withController, time } =
  useMineSweeper(selectedMode);

const { t } = useMyI18n();

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

function pushWithModeQuery(modeId: string | number) {
  router.push({ path: route.path, query: { mode: modeId } });
}

function recordFormatter(scoreAsMs: number) {
  return (scoreAsMs / 1000).toFixed(2) + ' ' + t('abbr.seconds');
}
</script>

<template>
  <Head>
    <title>{{ t('minesweeper') }} | {{ t('jon_ganebskis_blog') }}</title>
  </Head>
  <div class="mt-20 min-h-screen grid place-items-center text-dark-500 dark:text-light-500">
    <h1 class="text-3xl md:text-5xl">{{ t('minesweeper') }}</h1>
    <div class="mt-10 flex justify-center">
      <ui-select
        :model-value="selectedMode"
        option-label-key="mode"
        :label="t('mode')"
        class="w-72"
        @update:model-value="pushWithModeQuery"
      >
        <ui-option v-for="mode in modes" :key="mode.id" :value="mode.id" :label="mode.mode" />
      </ui-select>
    </div>
    <client-only>
      <div
        v-if="0 < meta.rows && 0 < meta.cols"
        class="mt-20 flex flex-col items-center justify-center game"
        @contextmenu.prevent
      >
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
                <span
                  v-if="!node.isVeiled"
                  class="font-extrabold"
                  :class="[getHintColor(node.hint)]"
                >
                  {{ node.hint === 0 ? '' : node.hint }}
                </span>
                <span v-if="node.isExploded">💣</span>
                <span v-if="node.isFlagged">🚩</span>
                <span v-if="node.isQuestion">❓</span>
              </button>
            </div>
          </div>
        </div>
        <AuthWarning class="mt-2" />
      </div>
    </client-only>
    <Records :is-loading="isRecordsLoading" :data="records" :formatter="recordFormatter" />
    <client-only>
      <ui-contour-lines />
    </client-only>
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

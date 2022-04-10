<script setup lang="ts">
import { Ref } from 'vue';
import { useGameInfo } from '../composables/useGameInfo';
import { useStyles } from '../composables/useStyles';

const PASSWORD = '111-1-1-11111111';

const props = defineProps<{ position: Ref<number[][]>; left: number }>();

const { isCatHere, gameStatus, level } = useGameInfo();

const { nodeSize } = useStyles();

onKeyStroke(['ArrowUp', 'ArrowDown'], lureCat);

let password = '';
let setTimeoutId: NodeJS.Timeout;
let intervalId: NodeJS.Timer;

onBeforeUnmount(() => {
  clearInterval(intervalId);
  clearTimeout(setTimeoutId);
});

// Clear timeout and interval when game is finished or reset.
watch(gameStatus, () => {
  if (gameStatus.value === 'PLAYING') return;
  clearInterval(intervalId);
  clearTimeout(setTimeoutId);
});

function lureCat(e: KeyboardEvent) {
  e.preventDefault();
  if (gameStatus.value !== 'READY') return;
  if (isCatHere.value) return;
  clearTimeout(setTimeoutId);
  password += e.key === 'ArrowUp' ? 1 : -1;
  if (password !== PASSWORD) return (setTimeoutId = setTimeout(() => (password = ''), 1000));
  isCatHere.value = true;
  activateMeanCat();
}

const hunt = ref(false);
const x = ref('0rem');
const y = ref('0rem');

onMounted(() => {
  x.value = '0rem';
  y.value = '0rem';
});

function grab() {
  x.value = Math.floor((props.position.value[2][1] + 1) * nodeSize.value + props.left) + 'px';
  y.value = props.position.value[2][0] * nodeSize.value + 'px';
}

function activateMeanCat() {
  intervalId = setInterval(() => {
    if (gameStatus.value !== 'PLAYING') return;
    grab();
    hunt.value = true;
    if (level.value > 2) setTimeout(grab, 2000);
    if (level.value > 4) setTimeout(grab, 2500);
  }, 15000);
}
</script>

<template>
  <div class="relative flex items-center">
    <img
      v-if="isCatHere"
      src="https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/tetris-images/paw.png"
      alt=""
      class="absolute right-full z-10 opacity-0 filter brightness-75"
      :class="{ paw__active: hunt }"
      :style="{ width: `${nodeSize * 22}px` }"
      @animationend="hunt = false"
    />
  </div>
</template>

<style scoped lang="css">
@keyframes paw {
  0% {
    transform: translateX(0px) translateY(v-bind(y));
    opacity: 0;
  }
  2% {
    transform: translateX(v-bind(x)) translateY(v-bind(y));
    opacity: 1;
  }
  98% {
    transform: translateX(v-bind(x)) translateY(v-bind(y));
    opacity: 1;
  }
  100% {
    transform: translateX(0px) translateY(v-bind(y));
    opacity: 0;
  }
}
.paw__active {
  animation: paw linear 4s;
}
</style>

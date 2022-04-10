<script setup lang="ts">
import { Ref } from 'vue';
import { useGameInfo } from '../composables/useGameInfo';

const PASSWORD = '111-1-1-11111111';

const props = defineProps<{ position: Ref<number[][]>; left: number }>();

const { isCatHere, gameStatus } = useGameInfo();

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

function activateMeanCat() {
  intervalId = setInterval(() => {
    console.log('eee');
    if (gameStatus.value !== 'PLAYING') return;
    x.value = Math.floor(props.position.value[2][1] * 2 + props.left / 16 + 2) + 'rem';
    y.value = props.position.value[2][0] * 2 + 'rem';
    hunt.value = true;
  }, 15000);
}
</script>

<template>
  <div class="relative flex items-center">
    <img
      v-if="isCatHere"
      src="https://ijivzwfsihdcvwrntdpe.supabase.co/storage/v1/object/public/tetris-images/paw.png"
      alt=""
      class="absolute right-full w-[50rem] opacity-0 filter brightness-75"
      :class="{ paw__active: hunt }"
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
  5% {
    transform: translateX(v-bind(x)) translateY(v-bind(y));
    opacity: 1;
  }
  95% {
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

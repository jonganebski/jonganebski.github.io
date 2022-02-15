<script setup lang="ts">
import { computeRandInt } from '~/libs/random';
import gsap from 'gsap';

const props = withDefaults(defineProps<{ delay?: number }>(), { delay: computeRandInt(0, 10) });

const { height: windowHeight } = useWindowSize();

const cloudShadowRef = ref<HTMLDivElement | null>(null);
const height = ref(computeRandInt(300, windowHeight.value * 2));
const left = ref(computeRandInt(-height.value - 100, height.value + 100));
const durationSeconds = ref(computeRandInt(50, 60));
const delaySeconds = ref(props.delay);

onMounted(() => {
  if (!cloudShadowRef.value) return;
  function onComplete(this: gsap.core.Tween) {
    height.value = computeRandInt(300, 2000);
    this.restart();
  }
  gsap
    .fromTo(
      cloudShadowRef.value,
      { y: 0 },
      {
        y: -windowHeight.value * 2.5,
        delay: delaySeconds.value,
        duration: durationSeconds.value,
        ease: 'linear',
      },
    )
    .eventCallback('onComplete', onComplete);
});
</script>

<template>
  <div
    ref="cloudShadowRef"
    class="fixed top-full pointer-events-none filter blur-xl"
    :style="{ left: `${left}px`, width: `${height}px`, height: `${height}px` }"
  >
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <path
        fill="black"
        class="opacity-15"
        d="M392,298.5Q401,347,362,378.5Q323,410,275,409.5Q227,409,168.5,410.5Q110,412,68.5,364Q27,316,20.5,248.5Q14,181,64,137Q114,93,167,66Q220,39,285.5,34Q351,29,401,75Q451,121,417,185.5Q383,250,392,298.5Z"
      >
        <!-- <animate
          attributeName="d"
          dur="15s"
          repeatCount="indefinite"
          values="
        M436,307.5Q470,365,400,365.5Q330,366,299,380.5Q268,395,235,386.5Q202,378,149.5,381.5Q97,385,90.5,338Q84,291,60.5,244Q37,197,64,153Q91,109,127.5,65.5Q164,22,214.5,73Q265,124,294,134.5Q323,145,359,159.5Q395,174,398.5,212Q402,250,436,307.5Z;
        M432,289.5Q401,329,365,346.5Q329,364,300.5,397.5Q272,431,234.5,411Q197,391,155,381Q113,371,102,330Q91,289,57,241.5Q23,194,49,144.5Q75,95,127.5,81Q180,67,224,84.5Q268,102,311,100.5Q354,99,382.5,132Q411,165,437,207.5Q463,250,432,289.5Z;
        M436,307.5Q470,365,400,365.5Q330,366,299,380.5Q268,395,235,386.5Q202,378,149.5,381.5Q97,385,90.5,338Q84,291,60.5,244Q37,197,64,153Q91,109,127.5,65.5Q164,22,214.5,73Q265,124,294,134.5Q323,145,359,159.5Q395,174,398.5,212Q402,250,436,307.5Z;
        "
        /> -->
      </path>
    </svg>
  </div>
</template>

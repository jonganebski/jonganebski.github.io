<script setup lang="ts">
import { computeRandInt, randArrayElements } from '~/libs/random';
import gsap from 'gsap';

const props = withDefaults(defineProps<{ delay?: number }>(), { delay: computeRandInt(0, 10) });

const { height: windowHeight } = useWindowSize();

const cloudShadowRef = ref<HTMLDivElement | null>(null);
const height = ref(computeRandInt(300, windowHeight.value * 2));
const left = ref(computeRandInt(-height.value - 100, height.value + 100));
const durationSeconds = ref(computeRandInt(60, 70));
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
        y: -windowHeight.value * 3,
        delay: delaySeconds.value,
        duration: durationSeconds.value,
        ease: 'linear',
      },
    )
    .eventCallback('onComplete', onComplete);
});

function getD() {
  const d = randArrayElements(3, [
    'M436,307.5Q470,365,400,365.5Q330,366,299,380.5Q268,395,235,386.5Q202,378,149.5,381.5Q97,385,90.5,338Q84,291,60.5,244Q37,197,64,153Q91,109,127.5,65.5Q164,22,214.5,73Q265,124,294,134.5Q323,145,359,159.5Q395,174,398.5,212Q402,250,436,307.5Z;',
    'M432,289.5Q401,329,365,346.5Q329,364,300.5,397.5Q272,431,234.5,411Q197,391,155,381Q113,371,102,330Q91,289,57,241.5Q23,194,49,144.5Q75,95,127.5,81Q180,67,224,84.5Q268,102,311,100.5Q354,99,382.5,132Q411,165,437,207.5Q463,250,432,289.5Z;',
    'M436,307.5Q470,365,400,365.5Q330,366,299,380.5Q268,395,235,386.5Q202,378,149.5,381.5Q97,385,90.5,338Q84,291,60.5,244Q37,197,64,153Q91,109,127.5,65.5Q164,22,214.5,73Q265,124,294,134.5Q323,145,359,159.5Q395,174,398.5,212Q402,250,436,307.5Z;',
    'M390,286Q387,322,370.5,361Q354,400,313.5,418.5Q273,437,223.5,443.5Q174,450,138.5,415.5Q103,381,112.5,331Q122,281,85.5,240.5Q49,200,71,155.5Q93,111,136.5,88Q180,65,224,82Q268,99,323.5,81.5Q379,64,398,113Q417,162,405,206Q393,250,390,286Z;',
    'M446.5,305Q459,360,395,364Q331,368,301.5,400Q272,432,217,457.5Q162,483,123,440Q84,397,75,346Q66,295,54.5,247Q43,199,59.5,147.5Q76,96,120.5,61Q165,26,216,68Q267,110,312,102Q357,94,363.5,140.5Q370,187,402,218.5Q434,250,446.5,305Z;',
    'M418.5,303Q451,356,413.5,394.5Q376,433,325,442Q274,451,225.5,447Q177,443,142.5,409Q108,375,109.5,329.5Q111,284,99.5,247Q88,210,90,160Q92,110,129.5,71Q167,32,218,61Q269,90,297.5,115Q326,140,351,162Q376,184,381,217Q386,250,418.5,303Z;',
    'M417.5,292.5Q411,335,396,387.5Q381,440,327,441Q273,442,224.5,443.5Q176,445,125,425.5Q74,406,76.5,349Q79,292,71,248Q63,204,69.5,150Q76,96,137,104Q198,112,232.5,110Q267,108,305.5,110.5Q344,113,379,138.5Q414,164,419,207Q424,250,417.5,292.5Z;',
    'M396,291.5Q409,333,379.5,364Q350,395,309.5,402.5Q269,410,221.5,430Q174,450,125,427Q76,404,43.5,356.5Q11,309,29.5,254.5Q48,200,69,154Q90,108,127,65Q164,22,221.5,17Q279,12,327,40Q375,68,382.5,122.5Q390,177,386.5,213.5Q383,250,396,291.5Z;',
  ]);
  d.push(d[0]);
  return d.join(' ');
}
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
      <path fill="black" class="opacity-13 dark:opacity-30">
        <animate attributeName="d" dur="20s" repeatCount="indefinite" :values="getD()" />
      </path>
    </svg>
  </div>
</template>

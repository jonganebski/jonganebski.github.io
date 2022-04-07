<script setup lang="ts">
import type { UsePointsQueryResult } from '~/api/usePointsQuery';
import { usePointsQuery } from '~/api/usePointsQuery';
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();

const route = useRoute();
const fileName = route.path.split('/')[3];

const { data } = usePointsQuery(fileName);

const statistics = computed(() => {
  if (!data.value) return null;
  const totalDistance = data.value[data.value.length - 1].distance;
  let highest = 0;
  let lowest = 0;
  let upHill = 0;
  let downHill = 0;
  data.value?.forEach(({ ele }, index, array) => {
    const previousEle = array[Math.max(0, index - 1)].ele;
    if (previousEle < ele) {
      upHill += ele - previousEle;
    } else if (ele < previousEle) {
      downHill += previousEle - ele;
    }

    if (index === 0) {
      highest = ele;
      lowest = ele;
      return;
    }
    if (highest < ele) return (highest = ele);
    if (ele < lowest) return (lowest = ele);
  });
  return { totalDistance, highest, lowest, downHill, upHill };
});

const hoverPoint = ref<UsePointsQueryResult | null>(null);

function formatNumber({ unit, num }: { unit: 'm' | 'km'; num?: number }) {
  return `${
    num === undefined ? '?' : new Intl.NumberFormat('ko', { maximumFractionDigits: 2 }).format(num)
  } ${unit}`;
}
</script>

<template>
  <div
    class="max-w-screen-lg lg:mx-20 grid grid-rows-[45vh,auto,auto] shadow-lg bg-light-300 dark:bg-dark-300 text-dark-300 dark:text-light-300"
  >
    <map-detail v-model:hoverPoint="hoverPoint" :file-name="fileName" :points="data" />
    <ul class="p-5 grid sm:grid-cols-3 gap-5 md:gap-14 text-sm">
      <li class="px-6">
        <h6><carbon-arrows-vertical />{{ t('up_&_down') }}</h6>
        <p class="flex justify-between">
          <span>{{ t('uphill') }}</span>
          <span>{{ formatNumber({ num: statistics?.upHill, unit: 'm' }) }}</span>
        </p>
        <p class="flex justify-between">
          <span>{{ t('downhill') }}</span>
          <span> {{ formatNumber({ num: statistics?.downHill, unit: 'm' }) }}</span>
        </p>
      </li>
      <li class="px-6">
        <h6><carbon-mountain />{{ t('altitude') }}</h6>
        <p class="flex justify-between">
          <span>{{ t('highest') }}</span>
          <span>{{ formatNumber({ num: statistics?.highest, unit: 'm' }) }}</span>
        </p>
        <p class="flex justify-between">
          <span>{{ t('lowest') }}</span>
          <span>{{ formatNumber({ num: statistics?.lowest, unit: 'm' }) }}</span>
        </p>
        <p class="mt-2 flex justify-between">
          <span>{{ t('current') }}</span>
          <span>{{ formatNumber({ num: hoverPoint?.ele, unit: 'm' }) }}</span>
        </p>
      </li>
      <li class="px-6">
        <h6><carbon-movement />{{ t('distance') }}</h6>
        <p class="flex justify-between">
          <span>{{ t('total') }}</span>
          <span>{{ formatNumber({ num: statistics?.totalDistance, unit: 'km' }) }}</span>
        </p>
        <p class="mt-2 flex justify-between">
          <span>{{ t('current') }}</span>
          <span> {{ formatNumber({ num: hoverPoint?.distance, unit: 'km' }) }}</span>
        </p>
      </li>
    </ul>
    <chart-elevation v-model:hoverPoint="hoverPoint" :file-name="fileName" :points="data" />
  </div>
</template>

<style scoped lang="css">
h6 {
  @apply mb-3 flex gap-2 font-bold;
}
</style>

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
  const totalDistance = data.value[data.value.length - 1].distance.toFixed(2);
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
</script>

<template>
  <div
    class="max-w-screen-lg mx-20 grid grid-rows-[45vh,auto,auto] shadow-lg bg-light-300 dark:bg-dark-300 text-dark-300 dark:text-light-300"
  >
    <map-detail v-model:hoverPoint="hoverPoint" :file-name="fileName" :points="data" />
    <ul class="p-5 grid grid-cols-3 gap-14 text-sm">
      <li class="px-6">
        <h6 class="mb-3">{{ t('up_&_down') }}</h6>
        <p class="flex justify-between">
          <span>{{ t('uphill') }}</span>
          <span>{{ statistics?.upHill.toFixed(2) }} m</span>
        </p>
        <p class="flex justify-between">
          <span>{{ t('downhill') }}</span>
          <span> {{ statistics?.downHill.toFixed(2) }} m</span>
        </p>
      </li>
      <li class="px-6">
        <h6 class="mb-3">{{ t('altitude') }}</h6>
        <p class="flex justify-between">
          <span>{{ t('highest') }}</span>
          <span>{{ statistics?.highest ?? '?' }} m</span>
        </p>
        <p class="flex justify-between">
          <span>{{ t('lowest') }}</span>
          <span>{{ statistics?.lowest ?? '?' }} m</span>
        </p>
        <p class="mt-2 flex justify-between">
          <span>{{ t('current') }}</span>
          <span>{{ hoverPoint ? `${hoverPoint.ele} m` : null }}</span>
        </p>
      </li>
      <li class="px-6">
        <h6 class="mb-3">{{ t('distance') }}</h6>
        <p class="flex justify-between">
          <span>{{ t('total') }}</span>
          <span>{{ statistics?.totalDistance ?? '?' }} km</span>
        </p>
        <p class="mt-2 flex justify-between">
          <span>{{ t('current') }}</span>
          <span> {{ hoverPoint ? `${hoverPoint.distance.toFixed(2)} km` : null }}</span>
        </p>
      </li>
    </ul>
    <chart-elevation v-model:hoverPoint="hoverPoint" :file-name="fileName" :points="data" />
  </div>
</template>

<style lang="css" scoped>
.flip {
  transform: scaleY(-1);
}
</style>

<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';

interface Props {
  clicksCount: number;
  shuffleCount: number;
  score: number | null;
  time: number | null;
}

const props = defineProps<Props>();

const { t } = useMyI18n();

const duration = computed(() => {
  if (!props.time) return null;
  const minutes = Math.floor(props.time / (1000 * 60));
  const seconds = Math.floor((props.time - minutes * 1000 * 60) / 1000);
  const milliseconds = props.time - minutes * 1000 * 60 - seconds * 1000;
  return { minutes, seconds, milliseconds };
});
</script>

<template>
  <div class="text-sm">
    <span>
      {{ t('move', 2) }}:
      <span
        :class="[
          props.clicksCount <= props.shuffleCount
            ? 'text-green-500'
            : props.clicksCount < props.shuffleCount * 2
            ? 'text-yellow-500'
            : 'text-red-500',
        ]"
      >
        {{ props.clicksCount }}
      </span>
    </span>
    <p v-if="duration" class="">
      <span>{{ t('time') }}: </span>
      <span v-if="duration.minutes">
        {{ duration.minutes }} {{ t('minutes').toLowerCase() }} {{ ' ' }}
      </span>
      <span v-if="duration.seconds">
        {{ duration.seconds }} {{ t('seconds').toLowerCase() }} {{ ' ' }}
      </span>
      <span v-if="duration.milliseconds">
        {{ duration.milliseconds }} {{ t('milliseconds').toLowerCase() }}
      </span>
    </p>
    <p v-if="score">{{ t('score') }}: {{ score }}</p>
  </div>
</template>

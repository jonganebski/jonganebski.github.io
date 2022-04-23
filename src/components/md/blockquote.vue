<script setup lang="ts">
import colors from 'windicss/colors';

interface Props {
  colorScheme?: keyof typeof colors;
  from?: string;
}

const props = withDefaults(defineProps<Props>(), { colorScheme: 'neutral' });

const color = computed(() => colors[props.colorScheme][500]);
</script>

<template>
  <div
    class="mx-5 py-5 px-3 flex space-x-3 border-l-4 bg-neutral-200 dark:bg-neutral-800"
    :style="{ borderLeftColor: color }"
  >
    <carbon-quotes class="w-10" :style="{ color }" />
    <div class="text-sm">
      <slot />
      <div class="mt-2">
        <i v-if="props.from" class="block font-bold">- {{ props.from }}</i>
      </div>
    </div>
  </div>
</template>

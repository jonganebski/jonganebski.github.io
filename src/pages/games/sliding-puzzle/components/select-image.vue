<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';
import type { ImageCategory } from '../composables/useImages';

interface Props {
  modelValue: string;
  images: ImageCategory[];
}

interface Emits {
  (event: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { t } = useMyI18n();
</script>

<template>
  <ui-select
    :model-value="props.modelValue"
    :label="t('image')"
    class="w-72"
    @update:model-value="emits('update:modelValue', $event.toString())"
  >
    <ui-option-group
      v-for="{ categoryName, options } in props.images"
      :key="categoryName"
      :category-name="categoryName"
      class="text-dark-500"
    >
      <ui-option
        v-for="option in options"
        :key="option.url"
        :value="option.url"
        :label="option.label"
      ></ui-option>
    </ui-option-group>
  </ui-select>
</template>

<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';
import type { ImageOption } from '../composables/useImages';

interface IProps {
  selectedImage: ImageOption;
}

const props = defineProps<IProps>();

const { t } = useMyI18n();
</script>

<template>
  <div class="mt-4 px-2 text-center">
    <span class="text-sm text-gray-700 dark:text-gray-300">
      Photo by
      <a
        :class="[props.selectedImage.creator?.url ? 'link__active' : 'link__inactive']"
        :href="props.selectedImage.creator?.url"
        target="_blank"
        rel="noopener"
      >
        {{ props.selectedImage.creator?.name }}
      </a>
    </span>
    <span class="text-sm text-gray-700 dark:text-gray-300">
      on
      <a
        :class="[props.selectedImage.provider?.url ? 'link__active' : 'link__inactive']"
        :href="props.selectedImage.provider?.url"
        target="_blank"
        rel="noopener"
      >
        {{ props.selectedImage.provider?.name }}
      </a>
    </span>
    <p class="text-xs text-gray-500">
      {{ t('all_rights_of_the_image_belong_to_the_creator') }}
    </p>
  </div>
</template>

<style scoped lang="css">
.link__active {
  @apply underline hover:text-dark-500 dark:hover:text-light-500;
}
.link__inactive {
  @apply pointer-events-none;
}
</style>

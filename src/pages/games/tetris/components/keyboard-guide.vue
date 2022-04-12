<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();
</script>

<template>
  <div>
    <h6 class="h-0 opacity-0">{{ t('keyboard_guide') }}</h6>
    <ul class="grid gap-2">
      <li>
        <div :aria-label="t('arrow_left_key')"><carbon-arrow-left /></div>
        : {{ t('move_block_left') }}
      </li>
      <li>
        <div :aria-label="t('arrow_right_key')"><carbon-arrow-right /></div>
        : {{ t('move_block_right') }}
      </li>
      <li>
        <div :aria-label="t('arrow_up_key')"><carbon-arrow-up /></div>
        : {{ t('rotate_block') }}
      </li>
      <li>
        <div :aria-label="t('arrow_down_key')"><carbon-arrow-down /></div>
        : {{ t('move_block_downwards') }}
      </li>
      <li>
        <div :aria-label="t('space_bar_key')" class="px-1">{{ t('space_bar') }}</div>
        : {{ t('drop_block') }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="css">
li {
  @apply flex items-center gap-1 text-sm;
}
li > div {
  @apply border rounded;
}
</style>

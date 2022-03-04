<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();

const contourLinesTransitionFinished = ref(false);

const lazyParagraphTransitionClass = computed(() =>
  contourLinesTransitionFinished.value ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
);
</script>

<template>
  <section class="max-w-screen-md pt-40 px-10 mx-auto text-dark-500 dark:text-light-500">
    <p class="transition-all duration-1000 transform" :class="[lazyParagraphTransitionClass]">
      {{ t('hello') }}! 👋
    </p>
    <p
      class="transition-all duration-1000 transform delay-150"
      :class="[lazyParagraphTransitionClass]"
    >
      {{ t('i_am_a_frontend_developer_and_a_traveler') }}
    </p>
    <p
      class="mt-10 text-red-600 transition-all duration-1000 transform delay-300"
      :class="[lazyParagraphTransitionClass]"
    >
      🔨 {{ t('this_site_is_under_development') }} 🔨
    </p>
  </section>
  <client-only>
    <div v-if="contourLinesTransitionFinished">
      <ui-cloud-shadow :delay="0" />
      <ui-cloud-shadow :delay="10" />
      <ui-cloud-shadow :delay="20" />
      <ui-cloud-shadow :delay="30" />
    </div>
  </client-only>

  <client-only>
    <ui-contour-lines
      :transition="true"
      @on-transition-end="contourLinesTransitionFinished = true"
    />
  </client-only>
</template>

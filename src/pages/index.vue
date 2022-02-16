<script setup lang="ts">
import { useMyI18n } from '~/plugins/i18n';

const { t } = useMyI18n();

const cloudShadows = ref(false);
</script>

<template>
  <section class="max-w-screen-md pt-40 mx-auto">
    <p>{{ t('hello') }}! 👋</p>
    <p>{{ t('welcome_to_my_blog') }}</p>
    <p>{{ t('i_am_a_frontend_developer_and_a_traveler') }}</p>
  </section>
  <div v-if="cloudShadows">
    <ui-cloud-shadow :delay="0" />
    <ui-cloud-shadow :delay="10" />
    <ui-cloud-shadow :delay="20" />
    <ui-cloud-shadow :delay="30" />
  </div>

  <ui-contour-lines :draw="true" @on-transition-end="cloudShadows = true" />
</template>

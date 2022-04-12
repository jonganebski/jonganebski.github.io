<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';
import { Head } from '@vueuse/head';
import { getRoutePosts } from '~/libs/markdown';
import { useMyI18n } from '~/plugins/i18n';
import RoutesList from './components/routes-list.vue';
import RoutesSwiper from './components/routes-swiper.vue';
import SelectCountry from './components/select-country.vue';
import WorldMap from './components/world-map.vue';
import { useSearchParams } from './composables/useSearchParams';

const { lg } = useBreakpoints(breakpointsTailwind);

const { t } = useMyI18n();
const { filterBySearchParams, changeParam, countryParam } = useSearchParams();

const posts = computed(() => getRoutePosts()?.filter(filterBySearchParams).reverse());
</script>

<template>
  <Head>
    <title>{{ t('travel') }} | {{ t('jon_ganebskis_blog') }}</title>
  </Head>
  <div class="px-15 h-14">
    <SelectCountry :country-param="countryParam" @select-country="changeParam" />
  </div>
  <div class="h-[90vh] grid grid-rows-[2fr,1fr] lg:grid-rows-1 lg:grid-cols-[1.5fr,1fr]">
    <client-only>
      <WorldMap />
    </client-only>
    <RoutesList v-if="lg" :posts="posts" />
    <RoutesSwiper v-else :posts="posts" />
  </div>
  <ui-contour-lines />
</template>

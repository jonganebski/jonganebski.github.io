<script setup lang="ts">
import { User } from '@supabase/supabase-js';
import { useQueryClient } from 'vue-query';
import { useUserQuery } from '~/api/useUserQuery';
import { supabase } from '~/libs/supabase';
import { useMyI18n } from '~/plugins/i18n';
import { useNav } from '../composables/useNav';

const { setLocaleTo, locale, t } = useMyI18n();

const queryClient = useQueryClient();

const { data: user } = useUserQuery();

const links = useNav();

const isAuthContainerOpen = ref(false);

const authContainer = ref<HTMLDivElement | null>(null);
onClickOutside(authContainer, closeAuthContainer);

function closeAuthContainer() {
  isAuthContainerOpen.value = false;
}

function toggleAuthContainer() {
  isAuthContainerOpen.value = !isAuthContainerOpen.value;
}

onMounted(() => {
  supabase.auth.onAuthStateChange((_, session) => {
    queryClient.setQueryData<User | null>('user', () => session?.user ?? null);
  });
});
</script>

<template>
  <header
    class="fixed top-0 left-0 z-10 h-screen w-14 pb-10 hidden lg:flex flex-col items-center bg-white dark:bg-dark-500 text-sm text-dark-500 dark:text-light-500 shadow-2xl"
  >
    <div class="mt-22 w-0 h-0">
      <nav class="nav">
        <router-link
          v-for="{ path, isMatch, label } in links"
          :key="path"
          :to="path"
          :class="[isMatch ? 'text-rose-600' : 'hover:text-rose-500']"
          :style="{
            transform: locale === 'ko' ? `rotate(90deg)` : '',
            marginLeft: locale === 'ko' ? `${label.length + 1}rem` : '1.5rem',
          }"
        >
          {{ label }}
        </router-link>
      </nav>
    </div>
    <div class="mt-auto grid justify-center">
      <div class="relative mb-10" ref="authContainer">
        <ui-avatar
          :src="user?.user_metadata.avatar_url"
          :aria-label="t('click_to_open_authentication_menu')"
          :alt="t('the_avatar_of_the_authenticated_user')"
          @click="toggleAuthContainer"
        />
        <div class="absolute top-1/2 transform -translate-y-1/2 left-14">
          <div v-if="isAuthContainerOpen && user" class="auth-container">
            <div class="text-dark-500">
              <p>Email: {{ user.email }}</p>
              <p>Provider: {{ user.app_metadata.provider?.toUpperCase() }}</p>
            </div>
            <auth-btn sign-out />
          </div>
          <div v-if="isAuthContainerOpen && !user" class="auth-container">
            <h6 class="text-dark-500">{{ t('sign_up_or_sign_in') }}</h6>
            <div class="grid gap-3">
              <auth-btn provider="github" />
              <auth-btn provider="google" />
              <auth-btn provider="facebook" />
            </div>
            <p class="text-xs text-gray-500">
              {{ t('sign_up_notice') }}
            </p>
          </div>
        </div>
      </div>
      <client-only>
        <ui-toggle-dark-mode-btn class="mb-10 mx-auto text-lg" />
      </client-only>
      <button>
        <span
          class="write-vertical-right"
          :class="locale === 'ko' && 'text-red-500'"
          @click="setLocaleTo('ko')"
        >
          한국어
        </span>
      </button>
      <span class="text-center"> - </span>
      <button>
        <span
          class="write-vertical-right write-orient-upright"
          :class="locale === 'en' && 'text-red-500'"
          @click="setLocaleTo('en')"
        >
          en
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped lang="css">
.nav {
  display: flex;
  flex-direction: row-reverse;
  width: fit-content;
  transform-origin: right;
  transform: translate(-100%) rotate(-90deg);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

.auth-container {
  @apply min-w-sm p-4 grid gap-6 bg-white rounded shadow-xl;
  animation: slide-in linear 0.3s;
}
</style>

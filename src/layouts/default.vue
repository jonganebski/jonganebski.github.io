<script setup lang="ts">
const { locale, t } = useI18n();

const setLocale = (localeTo: 'ko' | 'en') => {
	locale.value = localeTo;
};
</script>

<template>
	<div>
		<header
			class="fixed top-0 left-0 h-screen w-14 py-10 flex flex-col items-center bg-green-100 text-sm"
		>
			<div>S</div>
			<div class="w-0 h-0">
				<nav class="nav">
					<router-link to="/posts/techs" :class="[locale === 'ko' && 'transform rotate-90']">
						{{ t('nav.techs') }}
					</router-link>
					<router-link to="/posts/routes" :class="[locale === 'ko' && 'transform rotate-90']">
						{{ t('nav.routes') }}
					</router-link>
					<router-link to="/" :class="[locale === 'ko' && 'transform rotate-90']">
						{{ t('nav.home') }}
					</router-link>
				</nav>
			</div>
			<div class="mt-auto grid justify-center">
				<button>
					<span
						class="write-vertical-right"
						:class="locale === 'ko' && 'text-red-300'"
						@click="setLocale('ko')"
					>
						한국어
					</span>
				</button>
				<span class="text-center"> - </span>
				<button>
					<span
						class="write-vertical-right write-orient-upright"
						:class="locale === 'en' && 'text-red-300'"
						@click="setLocale('en')"
					>
						en
					</span>
				</button>
			</div>
		</header>
		<main class="ml-14">
			<router-view />
		</main>
	</div>
</template>

<style scoped lang="css">
.nav {
	display: flex;
	gap: 1.5rem;
	width: fit-content;
	transform-origin: right;
	transform: translate(-100%) rotate(-90deg);
}
</style>

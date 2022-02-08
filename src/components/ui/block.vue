<script setup lang="ts">
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = withDefaults(
	defineProps<{ contentClass?: string; as?: keyof HTMLElementTagNameMap }>(),
	{ as: 'div' },
);

const container = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);
const bottom = ref<HTMLDivElement | null>(null);
const top = ref<HTMLDivElement | null>(null);

onMounted(() => {
	if (!container.value || !content.value || !bottom.value || !top.value) return;
	const bottomTimeline = gsap.timeline({ defaults: { ease: 'none' } });
	bottomTimeline.fromTo(
		bottom.value,
		{
			clipPath: `polygon(0 0, 100% 0, 80% 0%, 20% 0%)`,
			background: `linear-gradient(#a1a1aa, black 0%)`,
		},
		{
			clipPath: `polygon(0 0, 100% 0, 80% 100%, 20% 100%)`,
			background: `linear-gradient(#a1a1aa, black 100%)`,
		},
	);
	ScrollTrigger.create({
		trigger: container.value,
		animation: bottomTimeline,
		start: 'center center',
		end: 'center top',
		scrub: true,
	});
	const topTimeline = gsap.timeline({ defaults: { ease: 'none' } });
	topTimeline.fromTo(
		top.value,
		{
			clipPath: `polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)`,
			background: `linear-gradient(black 0%, #a1a1aa)`,
		},
		{
			clipPath: `polygon(20% 100%, 80% 100%, 100% 100%, 0% 100%)`,
			background: `linear-gradient(black 100%, #a1a1aa)`,
		},
	);
	ScrollTrigger.create({
		trigger: container.value,
		animation: topTimeline,
		start: 'center bottom',
		end: 'center center',
		scrub: true,
	});
	const containerTimeline = gsap.timeline({ defaults: { ease: 'none' } });
	containerTimeline.fromTo(container.value, { scale: '0.95' }, { scale: '1' });
	ScrollTrigger.create({
		trigger: container.value,
		animation: containerTimeline,
		start: 'top bottom',
		end: 'center 60%',
		scrub: true,
	});
	const containerTimelineX = gsap.timeline({ defaults: { ease: 'none' } });

	containerTimelineX.fromTo(container.value, { scale: '1' }, { scale: '0.95' });
	ScrollTrigger.create({
		trigger: container.value,
		animation: containerTimelineX,
		start: 'center 40%',
		end: 'bottom top',
		scrub: true,
	});
});
</script>

<template>
	<props.as ref="container" class="relative">
		<div ref="top" class="w-full h-20"></div>
		<div ref="content" :class="props.contentClass">
			<slot />
		</div>
		<div ref="bottom" class="w-full h-20"></div>
	</props.as>
</template>

<style scoped lang="css"></style>

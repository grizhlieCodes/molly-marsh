<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	let { blok }: { blok: any } = $props();
	let { section_id, section_labelledby } = $state(blok.section[0]);
</script>

<section
	id={section_id}
	aria-labelledby={section_labelledby}
	class="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 px-6 py-12"
>
	<div class="fancy-column-hero__heading w-full">
		<StoryblokComponent blok={blok.hero_heading[0]}></StoryblokComponent>
	</div>
	<div class="fancy-column-hero__image aspect-3/2 w-full">
		<StoryblokComponent blok={blok.hero_image[0]}></StoryblokComponent>
	</div>
	<div class="fancy-column-hero__text w-full max-w-3xl">
		<StoryblokComponent blok={blok.hero_description[0]}></StoryblokComponent>
	</div>
	<div class="fancy-column-hero__button">
		{#if blok.hero_cta && blok.hero_cta.length > 0}
			{#each blok.hero_cta as blokk}
				<StoryblokComponent blok={blokk}></StoryblokComponent>
			{/each}
		{/if}
	</div>
</section>

<!-- <style lang="postcss">
	:global {
		.fancy-column-hero__image img {
			object-position: 60% 40%;
		}
		@media only screen and (max-width: 460px) {
			.fancy-column-hero__image img {
				object-fit: cover;
				object-position: 60% 40%;
				aspect-ratio: 1/1;
			}
		}
		@media only screen and (min-width: 460px) {
			.fancy-column-hero__image {
				aspect-ratio: 2 / 1;
			}
			.fancy-column-hero__image img {
			}
		}
		@media only screen and (min-width: 768px) {
			.fancy-column-hero__image {
				aspect-ratio: 413 / 144;
			}

			.fancy-column-hero__image img {
				object-position: 60% 0%;
			}
		}
	}
</style> -->

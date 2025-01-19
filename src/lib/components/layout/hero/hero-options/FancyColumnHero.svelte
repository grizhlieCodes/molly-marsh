<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	let { blok }: { blok: any } = $props();
	$inspect(blok);
</script>

<section id={blok?.hero_id} class="mx-auto w-[90vw]">
	<div class="fancy-column-hero__heading">
		<StoryblokComponent blok={blok.hero_heading[0]}></StoryblokComponent>
	</div>
	<div class="fancy-column-hero__image">
		<StoryblokComponent blok={blok.hero_image[0]}></StoryblokComponent>
	</div>
	<div class="fancy-column-hero__text">
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

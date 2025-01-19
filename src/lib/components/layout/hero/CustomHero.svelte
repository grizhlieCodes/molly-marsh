<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import FancyColumnHero from './hero-options/FancyColumnHero.svelte';
	let heroSectionOptions: any = {
		fancyColumn: FancyColumnHero
	};
	let { blok }: { blok: any } = $props();
	$inspect(blok);
	let blokHasHero = $state(blok.hero_section_style && blok.hero_section_style.length > 0);
	let HeroSection = $state(blokHasHero ? heroSectionOptions[blok?.hero_section_style] : undefined);
</script>

<div use:storyblokEditable={blok}>
	{#if blokHasHero && HeroSection}
		<HeroSection {blok}></HeroSection>
	{/if}
</div>

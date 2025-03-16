<script lang="ts">
	import { Button } from 'bits-ui';
	import { buttonHoverManager } from '$lib/scripts/actions';
	import * as opts from './buttonOptions';
	import type { ButtonStoryblok } from './buttonTypes';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';

	let { blok }: { blok: ButtonStoryblok } = $props();

	let buttonStyles = $state({
		sizeStyling: opts.sizeStylingOptions[blok.button_size.value],
		themeStyling: opts.themeStylingOptions[blok.button_theme]
	});

	let containerWidthStyling = $state(opts.widthStylingOptions[blok.button_width]);

	let target = $state(blok.target === 'none' || !blok.target ? undefined : opts.targetOptions[blok.target]);

	let BASE_CLASSES = 'flex justify-center items-center duration-300 transition-all relative overflow-hidden z-10 rounded-full font-sans cursor-pointer outline-offset-2 font-body font-[620] uppercase';

	let buttonStyling = $derived(`${BASE_CLASSES} ${Object.values(buttonStyles).join(' ')}`);
</script>

<div
	use:storyblokEditable={blok}
	use:buttonHoverManager
	class="button-link-container h-max {containerWidthStyling} group
{blok.button_theme} "
	style="--before-width: 0px;"
>
	<Button.Root {target} href={blok.url.url} class={buttonStyling} data-element="button-link" aria-label={blok.label} data-sveltekit-preload-data="hover">
		{#if blok.content && blok.content.length > 0}
			{#each blok.content as blokk}
				<StoryblokComponent blok={blokk}></StoryblokComponent>
			{/each}
		{/if}
	</Button.Root>
</div>

<!-- 

for later
		onclick={clickEvent}

-->

<style lang="postcss">
	:global {
		.button-link-container {
			&.primary > *::before {
				background-color: var(--color-button-primary-surface-hover);
				/* @apply bg-emerald-800; */
			}
			&.secondary > *::before {
				/* @apply bg-slate-700; */
				background-color: var(--color-button-secondary-surface-hover);
			}
		}

		.button-link-container > *::before {
			content: '';
			position: absolute;
			pointer-events: none;
			width: var(--before-width);
			aspect-ratio: 1;
			background: var(--before-bg);
			border-radius: 9999px;
			top: var(--before-top);
			left: var(--before-left);
			transition: width 350ms ease-in-out;
			z-index: -10;
			transform: translate(-50%, -50%);
		}

		.button-link-container *:is(span, svg, p) {
			pointer-events: none; /* Ensure child elements do not intercept clicks */
		}
	}
</style>

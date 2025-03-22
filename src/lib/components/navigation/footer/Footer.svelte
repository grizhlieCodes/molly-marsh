<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';
	import Logo from '../header/Logo.svelte';
	import FooterColumn from './FooterColumn.svelte';

	let { blok }: { blok: any } = $props();
	let { footer_columns, footer_disclaimer, footer_logo } = $derived(blok);

	// let footerStyling = $derived(`bg-surface-primary-900 row-start-3 min-h-72 w-full ${footer_show_cta ? 'border-t border-t-surface-primary-100' : ''} flex flex-col items-center justify-center`);
</script>

<!-- Footer Container -->
<div class="flex w-full flex-col items-center gap-0 bg-transparent">

	<footer
		class="bg-surface-primary-900 row-start-3
	min-h-72 w-full border-t-surface-primary-800 border-t flex flex-col items-center justify-center gap-8 px-6 py-10
	"
	>
		<div class="flex w-full max-w-5xl flex-col items-center gap-8 md:gap-20">
			<div
				class="flex w-full max-w-max flex-col gap-8 items-left
			md:flex-row md:items-start md:justify-between md:gap-6"
			>
				{#if footer_logo && footer_logo.length > 0}
					<div class="w-max hidden md:block">
						<Logo blok={footer_logo[0]}></Logo>
					</div>
				{/if}
				<!-- columns + links -->
				{#if footer_columns && footer_columns.length > 0}
					{#each footer_columns as footer_col_blok}
						<!-- content here -->
						<FooterColumn blok={footer_col_blok}></FooterColumn>
					{/each}
				{/if}
			</div>
			{#if footer_disclaimer && footer_disclaimer.length > 0}
				<div class="w-full max-w-lg md:max-w-3xl text-center">
					<StoryblokComponent blok={footer_disclaimer[0]}></StoryblokComponent>
				</div>
			{/if}
		</div>
	</footer>
</div>

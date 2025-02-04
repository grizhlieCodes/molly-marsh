<script lang="ts">
	import type { FormTextareaStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { storyblokEditable } from '@storyblok/svelte';
	import { slide } from 'svelte/transition';

	let { blok, input_errors, formBind }: { blok: FormTextareaStoryblok; input_errors: any; formBind: any; } = $props();

	let labelCss = `flex w-full flex-col items-start gap-2 font-sans`;
	// let labelStyling = $state(cn(labelCss, className));
</script>

<!-- has-[+*:not(:placeholder-shown)]:scale-75 -->
<label for="{blok.input_name}" class="{labelCss} group" use:storyblokEditable={blok}>
	<span
		class={`translate-y-[2.5rem] font-serif text-2xl text-surface-primary-400
	transition-all duration-300 group-focus-within:-translate-x-[0.6rem]
	group-focus-within:translate-y-0 group-focus-within:scale-75
	group-focus-within:text-surface-primary-600 has-[+*:not(:placeholder-shown)]:-translate-x-[0.6rem]
    has-[+*:not(:placeholder-shown)]:translate-y-0
    has-[+*:not(:placeholder-shown)]:scale-75
    ${input_errors ? '!text-red-500' : ''}
	`}>{blok.textarea_label}</span
	>
	<textarea
		name={blok.input_name}
		id={blok.input_name}
		class="h-[8rem] max-h-[3rem] w-full rounded-md border-b
            border-surface-primary-300 bg-surface-primary-50 px-3 py-2.5
	outline-none transition-all duration-500 focus:border-surface-primary-500
	focus:bg-surface-primary-100  group-focus-within:max-h-[10rem]
	overflow-hidden focus:overflow-scroll
    "
		placeholder=" "
		rows="4"
		bind:value={formBind}
	></textarea>
	{#if input_errors}
		<span class="text-sm text-red-400" transition:slide={{ duration: 250 }}>{input_errors}</span>
	{/if}
</label>
<script lang="ts">
	import type { FormTextareaStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { storyblokEditable } from '@storyblok/svelte';
	import { slide } from 'svelte/transition';

	let { blok, input_errors, formBind, formStyleName }: { blok: FormTextareaStoryblok; input_errors: any; formBind: any; formStyleName: string } = $props();

	let labelCss = `flex w-full flex-col items-start gap-2 font-sans`;
	// let labelStyling = $state(cn(labelCss, className));

	let allInputStyles: any = {
		fancy: {
			labelStyles: `flex w-full flex-col items-start gap-2 font-sans group`,
			labelSpanStyles: `translate-y-[2.5rem] font-serif text-2xl text-molly-dark-400 transition-all duration-300 group-focus-within:-translate-x-[0.6rem]
								group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-molly-dark-600 has-[+*:not(:placeholder-shown)]:-translate-x-[0.6rem] has-[+*:not(:placeholder-shown)]:translate-y-0 has-[+*:not(:placeholder-shown)]:scale-75 ${input_errors ? '!text-red-500' : ''}`,
			textAreaStyles: `h-[8rem] max-h-[3rem] w-full rounded-md border-b border-molly-dark-300 bg-molly-dark-50 px-3 py-2.5 outline-none transition-all duration-500 focus:border-molly-dark-500 focus:bg-molly-dark-100/70  group-focus-within:max-h-[10rem] overflow-hidden focus:overflow-scroll text-molly-dark-500 group-focus-within:text-secondary-800`,
								
			errorStyles: `text-sm text-red-400`
		},
		basic: {
			labelStyles: `flex w-full flex-col items-start gap-2 font-sans group`,
			labelSpanStyles: `${input_errors ? '!text-red-500' : ''} font-body text-body-secondary-500 group-focus-within:text-body-primary-900 transition-colors duration-300`,
			textAreaStyles: `w-full bg-white px-2 py-2.5 placeholder:text-body-secondary-400 placeholder:font-light border border-surface-secondary-300 focus-within:border-surface-primary-600 rounded-md outline-0 focus-within:text-body-secondary-800 text-body-secondary-500 font-[350] 
			${input_errors ? '!text-red-500' : ''} transition-all duration-300`,
			errorStyles: `text-sm text-red-400`
		}
	};

	let labelStyles = $derived(allInputStyles[formStyleName].labelStyles);
	let labelSpanStyles = $derived(allInputStyles[formStyleName].labelSpanStyles);
	let textAreaStyles = $derived(allInputStyles[formStyleName].textAreaStyles);
	let errorStyles = $derived(allInputStyles[formStyleName].errorStyles);
</script>

<!-- has-[+*:not(:placeholder-shown)]:scale-75 -->
<label for="{blok.input_name}" class="{labelStyles}" use:storyblokEditable={blok}>
	<span
		class={labelSpanStyles}>{blok.textarea_label}{blok.textarea_required ? '*':''}</span
	>
	<textarea
		name={blok.input_name}
		id={blok.input_name}
		class="{textAreaStyles}"
		placeholder=" "
		rows="4"
		bind:value={formBind}
	></textarea>
	{#if input_errors}
		<span class="{errorStyles}" transition:slide={{ duration: 250 }}>{input_errors}</span>
	{/if}
</label>
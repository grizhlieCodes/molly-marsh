<script lang="ts">
	import type { FormInputStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { storyblokEditable } from '@storyblok/svelte';
	import { slide } from 'svelte/transition';

	let { blok, input_errors, formBind, formStyleName }: { blok: FormInputStoryblok; input_errors?: any; formBind?: any; formStyleName: string } = $props();

	let allInputStyles: any = {
		fancy: {
			labelStyles: `flex w-full flex-col items-start gap-2 font-sans group`,
			labelSpanStyles: `translate-y-[2.5rem] font-serif text-2xl text-molly-dark-400 transition-all duration-300 group-focus-within:-translate-x-[0.6rem]
							group-focus-within:translate-y-0 group-focus-within:scale-75 group-focus-within:text-molly-dark-600 has-[+*:not(:placeholder-shown)]:-translate-x-[0.6rem]
							has-[+*:not(:placeholder-shown)]:translate-y-0 has-[+*:not(:placeholder-shown)]:scale-75 ${input_errors ? '!text-red-500' : ''}`,
			inputStyles: `border-molly-dark-300 bg-molly-dark-50 font-body focus:border-molly-dark-500 focus:bg-molly-dark-100/70
						text-molly-dark-500 w-full rounded-md border-b px-3 py-2.5
						text-lg transition-colors duration-500 outline-none group-focus-within:text-neutral-800`,
			errorStyles: `text-sm text-red-400`
		},
		basic: {
			labelStyles: `flex w-full flex-col items-start gap-2 font-sans group`,
			labelSpanStyles: `${input_errors ? '!text-red-500' : ''} font-body text-body-neutral-500 group-focus-within:text-body-primary-900 transition-colors duration-300`,
			inputStyles: `w-full bg-white px-2 py-2.5 placeholder:text-body-neutral-400 placeholder:font-light border border-surface-secondary-300 focus-within:border-surface-primary-600 rounded-md outline-0 focus-within:text-body-neutral-800 text-body-neutral-500 font-[350] 
			${input_errors ? '!text-red-500' : ''} transition-all duration-300`,
			errorStyles: `text-sm text-red-400`
		}
	};

	let labelStyles = $derived(allInputStyles[formStyleName].labelStyles);
	let labelSpanStyles = $derived(allInputStyles[formStyleName].labelSpanStyles);
	let inputStyles = $derived(allInputStyles[formStyleName].inputStyles);
	let errorStyles = $derived(allInputStyles[formStyleName].errorStyles);
</script>

<!-- has-[+*:not(:placeholder-shown)]:scale-75 -->
<label for={blok.input_name} class={labelStyles} use:storyblokEditable={blok}>
	<span class={labelSpanStyles}>{blok.input_label}</span>
	<input
		type={blok.input_type}
		name={blok.input_name}
		id={blok.input_name}
		class={inputStyles}
		placeholder={`${(blok.input_placeholder && blok.input_placeholder.length === 0) || blok.input_placeholder === ' ' ? ' ' : blok.input_placeholder}`}
		autocomplete={blok.input_autocomplete}
		bind:value={formBind}
	/>
	{#if input_errors}
		<span class={errorStyles} transition:slide={{ duration: 250 }}>{input_errors}</span>
	{/if}
</label>
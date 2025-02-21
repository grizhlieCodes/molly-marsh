<script lang="ts">
	// Standard imports
	import { bounceInOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';
	// import { SendHorizontal, Check, CircleX, LoaderCircle } from 'lucide-svelte';
	import SendHorizontal from 'lucide-svelte/icons/send-horizontal';
	import Check from 'lucide-svelte/icons/check';
	import CircleX from 'lucide-svelte/icons/circle-x';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	// Superform / ZOD implementation
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import type { FormStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { getContext } from 'svelte';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { contactFormValidation } from '$lib/stores/contactFormValidationStore.svelte';

	let { blok }: { blok: FormStoryblok } = $props();
	let superformData: any = getContext(blok.form_name);
	let hiddenDataForSchema = $state(JSON.stringify(blok.form_inputs));

	let { form, enhance, errors, message, reset } = $state(
		superForm(superformData(), {
			resetForm: false,
			invalidateAll: false,
			onResult: ({ result }) => {
				if (result.type === 'success') {
					formSubmissionButtonState = 'sent';
					return;
				}

				if (result.type === 'failure') {
					formSubmissionButtonState = 'error';
				}
			}
		})
	);


	let formSubmissionButtonState: 'send' | 'sent' | 'error' | 'sending' = $state('send');
	let formStyleName: string = $state(blok.form_style && blok.form_style.length > 0 ? blok.form_style : 'basic');
	let allFormStyles: any = {
		basic: {
			formContainer: `bg-surface-primary-50 border-2 border-surface-primary-200 flex flex-col w-full gap-2 p-5 md:p-7 lg:p-10 rounded-2xl`,
			formButton: {
				buttonBase: `mt-10 grid w-full justify-items-center cursor-pointer rounded-md px-6 py-3 font-sans font-semibold text-white uppercase transition-all`,
				buttonContentContainerStyling: `col-start-1 row-start-1 flex items-center gap-2`,
				buttonColors: {
					send: 'bg-surface-primary-800 hover:bg-surface-primary-900',
					sent: 'bg-surface-primary-600',
					error: 'bg-red-500',
					sending: 'bg-indigo-600'
				}
			}
		},
		fancy: {
			formContainer: `bg-molly-dark-50 flex h-full w-full flex-col gap-6 p-5 md:p-7 lg:p-10 rounded-2xl`,
			formButton: {
				buttonBase: `mt-10 grid w-max cursor-pointer rounded-md px-6 py-3 font-sans font-semibold text-white uppercase transition-all`,
				buttonContentContainerStyling: `col-start-1 row-start-1 flex items-center gap-2`,
				buttonColors: {
					send: 'bg-surface-primary-800 hover:bg-surface-primary-900',
					sent: 'bg-surface-primary-600',
					error: 'bg-red-500',
					sending: 'bg-indigo-600'
				}
			}
		}
	};

	let formStyling: any = $state(allFormStyles[formStyleName].formContainer);
	let buttonSelectedCol = $derived(allFormStyles[formStyleName].formButton.buttonColors[formSubmissionButtonState]);
	let buttonBaseStyling = $derived(allFormStyles[formStyleName].formButton.buttonBase);
	let buttonContentContainerStyling = $derived(allFormStyles[formStyleName].formButton.buttonContentContainerStyling);
</script>

{#if blok?.form_debug === true}
	<SuperDebug data={$form}></SuperDebug>
{/if}

<form
	use:storyblokEditable={blok}
	use:enhance
	action="{blok.form_action}"
	method="POST"
	class={formStyling}
	oninput={() => {
		if (formSubmissionButtonState !== 'send') {
			formSubmissionButtonState = 'send';
		}
	}}
>
	{#if blok.form_top_text && blok.form_top_text.length > 0}
		<StoryblokComponent blok={blok.form_top_text[0]}></StoryblokComponent>
	{/if}
	{#if message}
		<h3 transition:slide={{ duration: 250 }} class="text-surface-primary-500 text-base">{$message}</h3>
	{/if}
	<input name="schemaData" type="hidden" class="hidden" value={hiddenDataForSchema} />

	<div class="flex w-full flex-col gap-4 md:gap-6">
		{#if blok.form_inputs && blok.form_inputs.length > 0}
			{#each blok.form_inputs as input, i}
				<StoryblokComponent blok={input} formBind={$form[input.input_name]} input_errors={$errors[input.input_name]} {formStyleName}></StoryblokComponent>
			{/each}
		{/if}
	</div>

	<button
		type="submit"
		onclick={() => {
			formSubmissionButtonState = 'sending';
		}}
		class="{buttonSelectedCol} {buttonBaseStyling}"
	>
		{#if formSubmissionButtonState === 'send'}
			<div class={buttonContentContainerStyling}>
				<span transition:fly={{ x: 15, duration: 225, easing: bounceInOut }}>{blok.form_button_text}</span>
				<div transition:fly={{ x: 15, duration: 200, easing: bounceInOut }}>
					<SendHorizontal class="size-6" />
				</div>
			</div>
		{:else if formSubmissionButtonState === 'sending'}
			<div class={buttonContentContainerStyling}>
				<div transition:fly={{ x: -15, duration: 225, easing: bounceInOut }} class="animate-spin">
					<LoaderCircle class="size-6" />
				</div>
				<span transition:fly={{ x: -15, duration: 200, easing: bounceInOut }}>Sending...</span>
			</div>
		{:else if formSubmissionButtonState === 'sent'}
			<div class={buttonContentContainerStyling}>
				<div transition:fly={{ x: -15, duration: 225, easing: bounceInOut }}>
					<Check class="size-6" />
				</div>
				<span transition:fly={{ x: -15, duration: 200, easing: bounceInOut }}>Sent!</span>
			</div>
		{:else if formSubmissionButtonState === 'error'}
			<div class={buttonContentContainerStyling}>
				<div transition:fly={{ x: -15, duration: 225, easing: bounceInOut }}>
					<CircleX class="size-6" />
				</div>
				<span transition:fly={{ x: -15, duration: 200, easing: bounceInOut }}>Error</span>
			</div>
		{/if}
	</button>

	{#if blok.form_bottom_text && blok.form_bottom_text.length > 0}
		<StoryblokComponent blok={blok.form_bottom_text[0]}></StoryblokComponent>
	{/if}
</form>

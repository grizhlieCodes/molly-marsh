<script lang="ts">
	// Standard imports
	import { bounceInOut } from 'svelte/easing';
	import { fly, slide } from 'svelte/transition';
	import { SendHorizontal, Check, CircleX, LoaderCircle } from 'lucide-svelte';
	// Superform / ZOD implementation
	import { superForm } from 'sveltekit-superforms';
	import type { FormStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { getContext } from 'svelte';
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { contactFormValidation } from '$lib/stores/contactFormValidationStore.svelte';

	// let { blok, superformData }: { blok: FormStoryblok; superformData: any } = $props();
	let { blok }: { blok: FormStoryblok } = $props();

	let superformData: any = getContext('superformData');
	// let activeSuperformData = $state(superformData())

	let hiddenDataForSchema = $state(JSON.stringify(blok.form_inputs));

	let { form, enhance, errors, message, reset } = $state(
		superForm(superformData(), {
			resetForm: false,
			invalidateAll: false,
			onResult: ({ result }) => {
				// console.log(result);
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

	$inspect($errors);

	let formSubmissionButtonState = $state('send'); // send, sent, error, sending
	const buttonColors: any = {
		send: 'bg-molly-dark-500 hover:bg-molly-dark-700 focus-within:bg-molly-dark-700',
		sent: 'bg-molly-dark-500',
		error: 'bg-red-500',
		sending: 'bg-indigo-600'
	};
	let buttonSelectedCol = $derived(buttonColors[formSubmissionButtonState]);
</script>

<form
	use:enhance
	action="?/sendQuery"
	method="POST"
	class="bg-molly-dark-50 flex w-full max-w-3xl flex-col gap-6 p-10"
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

	<div class="flex w-full flex-col gap-4">
		{#if blok.form_inputs && blok.form_inputs.length > 0}
			{#each blok.form_inputs as input, i}
				<StoryblokComponent blok={input} formBind={$form[input.input_name]} input_errors={$errors[input.input_name]}></StoryblokComponent>
			{/each}
		{/if}
	</div>

	<button
		type="submit"
		onclick={() => {
			formSubmissionButtonState = 'sending';
		}}
	class="{buttonSelectedCol} grid w-max rounded-md px-6 py-3 mt-10 font-sans
	font-semibold text-white uppercase transition-all "
	>
		{#if formSubmissionButtonState === 'send'}
			<div class="col-start-1 row-start-1 flex items-center gap-2">
				<span transition:fly={{ x: 15, duration: 225, easing: bounceInOut }}>Send</span>
				<div transition:fly={{ x: 15, duration: 200, easing: bounceInOut }}>
					<SendHorizontal class="size-6" />
				</div>
			</div>
		{:else if formSubmissionButtonState === 'sending'}
			<div class="col-start-1 row-start-1 flex items-center gap-2">
				<div transition:fly={{ x: -15, duration: 225, easing: bounceInOut }} class="animate-spin">
					<LoaderCircle class="size-6" />
				</div>
				<span transition:fly={{ x: -15, duration: 200, easing: bounceInOut }}>Sending...</span>
			</div>
		{:else if formSubmissionButtonState === 'sent'}
			<div class="col-start-1 row-start-1 flex items-center gap-2">
				<div transition:fly={{ x: -15, duration: 225, easing: bounceInOut }}>
					<Check class="size-6" />
				</div>
				<span transition:fly={{ x: -15, duration: 200, easing: bounceInOut }}>Sent!</span>
			</div>
		{:else if formSubmissionButtonState === 'error'}
			<div class="col-start-1 row-start-1 flex items-center gap-2">
				<div transition:fly={{ x: -15, duration: 225, easing: bounceInOut }}>
					<CircleX class="size-6" />
				</div>
				<span transition:fly={{ x: -15, duration: 200, easing: bounceInOut }}>Error</span>
			</div>
		{/if}
	</button>
</form>

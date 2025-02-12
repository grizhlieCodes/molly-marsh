<script lang="ts">
	import { Button } from 'bits-ui';
	import { Dialog } from 'bits-ui';
	import { fade, fly } from 'svelte/transition';
	import * as textOptions from '$lib/components/ui/text/textOptions';
	import { z } from 'zod';
	import { superForm } from 'sveltekit-superforms';
	import X from 'lucide-svelte/icons/x';
	import FormInput from '$lib/components/form/FormInput.svelte';
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	let {
		blok,
		recommended
	}: {
		blok: any;
		recommended: boolean;
	} = $props();

	let priceId = $state(blok.price_id && blok.price_id.length > 0 ? blok.price_id : undefined);
	let text = $state(blok.label && blok.label.length > 0 ? blok.label : 'no label');

	let defaultStyling = 'w-full rounded-sm flex items-center justify-center transition-colors duration-300 p-3';

	let { textStyles } = $state(textOptions);
	let recommendedBasedStyling = $state(
		!recommended
			? `bg-surface-primary-200 border border-surface-primary-400 hover:bg-surface-primary-600 focus-within:bg-surface-primary-600 !text-body-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50`
			: `bg-surface-primary-800  hover:bg-surface-primary-950 focus-within:bg-surface-primary-950 !text-body-primary-50`
	);

	let stripeButtonSchema = z.object({
		email: z.string().email({ message: 'Must have an email' }).min(5, { message: 'Must be at least 5 chars long' }),
		priceId: z.string().min(10, { message: 'Must be at least 10 digits long.' })
	});


	let emailData = $state({ input_name: 'email', input_label: 'Email', zod_base_type: 'string', input_type: 'email', input_autocomplete: 'email', input_placeholder: ' ', input_value: '' });

	let mounted = $state(false);
	let formValid: any = $state()
	let priceIdData: any = $state(priceId)
	// let email: string = $state('');

	$inspect(emailData.input_value);

	const validateForm = () => {
		try {
			stripeButtonSchema.parse({email: emailData.input_value, priceId: priceIdData})
			formValid = true
			
		} catch (error) {
			formValid = false
		}
		// console.log("Schema Validation: ", formValid)
	}

	$effect(() => {
		if (mounted) {
			// console.log({ email: emailData.input_value, mounted });
			localStorage.setItem('email', emailData.input_value);
		}
	});

	onMount(() => {
		if (!mounted) {
			// console.log('starting up');
			let existingEmail: string | null | undefined = localStorage.getItem('email');
			if (existingEmail) {
				// console.log('Found email: ', emailData.input_value);
				emailData.input_value = existingEmail;
			}
			validateForm()
			mounted = true;
		}
	});
</script>

<Dialog.Root>
	<Dialog.Trigger
		class="{defaultStyling} {recommendedBasedStyling}
	{textStyles.para6} cursor-pointer font-medium uppercase"
	>
		{text}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay transition={fade} transitionConfig={{ duration: 150 }} class="fixed inset-0 z-50 bg-white/20 backdrop-blur-xl"></Dialog.Overlay>
		<Dialog.Content class="bg-molly-dark-50 border-surface-primary-200 fixed top-1/2 left-1/2 z-50 flex max-h-[70%] w-[90%] max-w-[30rem]
	-translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-scroll rounded-lg border p-7 shadow-2xl outline-none" transition={fly} transitionConfig={{ duration: 450, y: 40 }}>
			<Dialog.Description>
				<form
					action="?/stripeCheckout"
					method="POST"
					class=" flex h-full w-full max-w-3xl flex-col gap-6 p-5 md:p-7
				lg:p-10"
					oninput={validateForm}
					use:enhance
				>
					<input type="text" class="hidden" hidden bind:value={priceIdData} name="priceId" id="priceId" />

					<label for="{emailData.input_name}" class="flex w-full flex-col items-start gap-2 font-sans group">
						<span
							class={`translate-y-[2.5rem] font-serif text-2xl text-molly-dark-400
						transition-all duration-300 group-focus-within:-translate-x-[0.6rem]
						group-focus-within:translate-y-0 group-focus-within:scale-75
						group-focus-within:text-molly-dark-600 
						has-[+*:not(:placeholder-shown)]:-translate-x-[0.6rem]
						has-[+*:not(:placeholder-shown)]:translate-y-0
						has-[+*:not(:placeholder-shown)]:scale-75
						
						`}>{emailData.input_label}</span
						>
						<input
							type={emailData.input_type}
							name={emailData.input_name}
							id={emailData.input_name}
							class="w-full rounded-md border-b border-molly-dark-300 bg-molly-dark-50 
						px-3 py-2.5 outline-none transition-colors font-body text-lg
						duration-500 focus:border-molly-dark-500 focus:bg-molly-dark-100/70 text-molly-dark-500 group-focus-within:text-secondary-800"
						placeholder="{`${(emailData.input_placeholder && emailData.input_placeholder.length === 0) ||
						emailData.input_placeholder === ' ' ? ' ' : emailData.input_placeholder}`}"
							autocomplete="email"
							bind:value={emailData.input_value}
						/>
					</label>

					<button
						disabled={!formValid}
						type="submit"
						class="{defaultStyling} {recommendedBasedStyling}
					{textStyles.para6} cursor-pointer font-medium uppercase
					disabled:bg-surface-secondary-300 disabled:border
					disabled:border-surface-secondary-500
					disabled:text-body-secondary-600 disabled:cursor-not-allowed"
					>
						Continue to Stripe
					</button>
				</form>
			</Dialog.Description>
			<Dialog.Close
				class="bg-surface-primary-100 absolute
			top-[2px] right-[2px] cursor-pointer rounded-md p-2
			"
			>
				<div>
					<X class="size-6"></X>
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

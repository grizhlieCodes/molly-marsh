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
			? `bg-surface-primary-200 border border-surface-primary-400 hover:bg-surface-primary-600 focus-within:bg-surface-primary-600 text-body-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50`
			: `bg-surface-primary-800  hover:bg-surface-primary-950 focus-within:bg-surface-primary-950 text-body-primary-50`
	);

	// let stripeButtonSchema = z.object({
	// 	email: z.string().email({ message: 'Must have an email' }).min(5, { message: 'Must be at least 5 chars long' }),
	// 	priceId: z.string().min(10, { message: 'Must be at least 10 digits long.' })
	// });

	let dialogContentStyling = `bg-molly-dark-50 border-surface-primary-200 fixed top-1/2 left-1/2 z-50 flex max-h-[70%] w-[90%] max-w-[30rem]
	-translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-scroll rounded-lg border p-7 shadow-2xl outline-none`;
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
		<Dialog.Content class={dialogContentStyling} transition={fly} transitionConfig={{ duration: 450, y: 40 }}>
			<Dialog.Description>
				<form
					action="?/stripeCheckout"
					method="POST"
					class=" flex h-full w-full max-w-3xl flex-col gap-6 p-5 md:p-7
				lg:p-10"
					use:enhance
				>
					<input type="text" class="hidden" hidden value={priceId} name="priceId" id="priceId" />

					<FormInput blok={{ input_name: 'email', input_label: 'Email', zod_base_type: 'string', input_type: 'email', input_autocomplete: 'email', input_placeholder: ' ' }}></FormInput>

					<button
						type="submit"
						class="{defaultStyling} {recommendedBasedStyling}
	{textStyles.para6} cursor-pointer font-medium uppercase"
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

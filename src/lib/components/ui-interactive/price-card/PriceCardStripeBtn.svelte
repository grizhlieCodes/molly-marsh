<script lang="ts">
	import { Button } from 'bits-ui';

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

	import * as textOptions from '$lib/components/ui/text/textOptions';
	let { textStyles } = $state(textOptions);
	let recommendedBasedStyling = $state(
		!recommended
			? `bg-surface-primary-200 border border-surface-primary-400 hover:bg-surface-primary-600 focus-within:bg-surface-primary-600 text-body-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50`
			: `bg-surface-primary-800  hover:bg-surface-primary-950 focus-within:bg-surface-primary-950 text-body-primary-50`
	);
</script>

<form action="?/stripeCheckout" method="POST" class="w-full">
	<input type="text" class="hidden" hidden value={priceId} name="priceId" id="priceId" />
	<button
		type="submit"
		class="{defaultStyling} {recommendedBasedStyling}
	{textStyles.para6} font-medium uppercase cursor-pointer"
	>
		{text}
	</button>
</form>

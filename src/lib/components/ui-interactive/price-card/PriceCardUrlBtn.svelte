<script lang="ts">
	// blok:button url
	// blok:button text
	// parent: recommended?

	import { Button } from 'bits-ui';
	import * as textOptions from '$lib/components/ui/text/textOptions';

	let { textStyles } = $state(textOptions);

	let {
		blok,
		recommended
	}: {
		blok: any;
		recommended: boolean;
	} = $props();

	let href = $state(blok.url && blok.url.url.length > 0 ? blok.url.url : undefined);
	let text = $state(blok.label && blok.label.length > 0 ? blok.label : 'no label');
	let defaultStyling = 'w-full rounded-sm flex items-center justify-center transition-colors duration-300 p-3';
	let recommendedBasedStyling = $state(
		!recommended
			? `bg-surface-primary-200 border border-surface-primary-400 hover:bg-surface-primary-600 focus-within:bg-surface-primary-600 text-body-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50`
			: `bg-surface-primary-800  hover:bg-surface-primary-900 focus-within:bg-surface-primary-900 text-body-primary-50`
	);
</script>

<Button.Root
	{href}
	class="{defaultStyling} {recommendedBasedStyling}
{textStyles.para6} font-medium uppercase"
>
	{text}
</Button.Root>

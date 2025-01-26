<script lang="ts">
	import type { DividerStoryblok } from './divider';
	let { blok }: { blok: DividerStoryblok } = $props();
	import * as ops from './divider';

	let maxWidth = $state(blok.divider_max_width && blok.divider_max_width.value > 0 ? ops.maxWidthOptions[blok.divider_max_width.value] : undefined);
	let bg = $state(blok.divider_color && blok.divider_color.length > 0 ? ops.backgroundOptions[blok.divider_color] : ops.backgroundOptions['primary-100']);
	let height = $state(`${blok.divider_height.value}px`);
    // $inspect(blok)
</script>

{#if blok}
	<span class="w-full {maxWidth} {bg} block mx-auto" style:height></span>
{/if}

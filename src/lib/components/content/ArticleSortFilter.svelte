<script lang="ts">
	import { Select } from 'bits-ui';
	// import { ChevronDown, Check } from 'lucide-svelte';
	import Check from 'lucide-svelte/icons/check';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { fly } from 'svelte/transition';

	let { sortOptions, sortSelected, sortOpen }: { sortSelected: any; sortOpen: any; sortOptions: any } = $props();
</script>

<Select.Root type="single" bind:value={sortSelected} bind:open={sortOpen} items={sortOptions}>
	<Select.Trigger class="flex items-center justify-end outline-hidden" aria-label="select a sorting option">
		{sortSelected?.label || "Select sort"}
		<ChevronDown
			class="w-4 stroke-[0.8px]
	        transition-transform duration-300 {sortOpen ? 'rotate-180' : ''}"
		></ChevronDown>
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="w-[14rem] rounded-xl border border-solid
	    border-teal-200 bg-teal-50 px-1 py-3 shadow-xl outline-hidden"
			sideOffset={8}
			forceMount
		>
			{#snippet child({ wrapperProps, props, open })}
				{#if open}
					<div {...wrapperProps}>
						<div {...props} transition:fly={{ y: 15, opacity: 0, duration: 200 }}>
							{#each sortOptions as sort, i}
								<Select.Item
									class="flex w-full items-center justify-between
								 rounded-md px-5 py-3 text-sm outline-hidden
								 transition-all duration-200 select-none data-highlighted:bg-teal-200"
									value={sort.value}
									label={sort.label}
								>
									{#snippet children({ selected })}
										{sort.label}
										{#if selected}
											<div class="ml-auto">
												<Check class="w-3"></Check>
											</div>
										{/if}
									{/snippet}
								</Select.Item>
							{/each}
						</div>
					</div>
				{/if}
			{/snippet}
		</Select.Content>
	</Select.Portal>
</Select.Root>
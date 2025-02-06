<script lang="ts">
	import { Select } from 'bits-ui';
	import { ChevronDown, Check } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { sortOptions, sortSelected, sortOpen }: { sortSelected: any; sortOpen: any; sortOptions: any } = $props();
</script>

<Select.Root items={sortOptions} bind:open={sortOpen} preventScroll={false} bind:sortSelected closeOnEscape={true}>
	<Select.Trigger class="flex items-center justify-end outline-hidden " aria-label="select a sorting option">
		<Select.Value class="text-sm text-slate-500" placeholder="Select sort"></Select.Value>
		<ChevronDown
			class="w-4 stroke-[0.8px]
        transition-transform duration-300 {sortOpen ? 'rotate-180' : ''}"
		></ChevronDown>
	</Select.Trigger>
	<Select.Content
		sameWidth={false}
		class=" w-[14rem] rounded-xl border border-solid
    border-teal-200 bg-teal-50 px-1 py-3 shadow-xl outline-hidden"
		transition={fly}
		transitionConfig={{ y: 15, opacity: 0, duration: 200 }}
		sideOffset={8}
	>
		{#each sortOptions as sort, i}
			<Select.Item
				class="flex w-full items-center justify-between
             rounded-md px-5 py-3 text-sm outline-hidden
             transition-all duration-200 select-none data-highlighted:bg-teal-200 "
				value={sort.value}
				label={sort.label}
			>
				{sort.label}
				<Select.ItemIndicator>
					<Check class="w-3"></Check>
				</Select.ItemIndicator>
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>

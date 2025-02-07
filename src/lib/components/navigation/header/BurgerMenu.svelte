<script lang="ts">
	let { mobileMenuActive, toggleMobileMenuActive }: { mobileMenuActive: boolean; toggleMobileMenuActive: () => void } = $props();

	const spanStyling = 'block h-[3px] w-full origin-[-1px] rounded-full bg-surface-primary-800 transition-all duration-300';
</script>

<button
	aria-label="Toggle site navigation, mobile menu"
	aria-expanded={mobileMenuActive}
	onclick={toggleMobileMenuActive}
	class="md:hidden z-20 box-content flex w-6 cursor-pointer flex-col
items-center justify-between gap-1.5
rounded-md p-2 transition-colors duration-300 focus-within:bg-surface-primary-300 hover:bg-surface-primary-300"
>
	<span class="{mobileMenuActive ? 'translate-x-[4px] rotate-45' : ''} {spanStyling}"></span>
	<span class="{mobileMenuActive ? 'scale-0 opacity-0' : ''} {spanStyling}"></span>
	<span class="{mobileMenuActive ? 'translate-x-[4px] -rotate-45' : ''} {spanStyling}"></span>
</button>

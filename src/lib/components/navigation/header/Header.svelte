<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';
	import BurgerMenu from './BurgerMenu.svelte';
	import MobileNav from './MobileNav.svelte';
	import TabletDesktopNav from './TabletDesktopNav.svelte';
	import { fly } from 'svelte/transition';
	import Logo from './Logo.svelte';
	import Button from '$lib/components/ui-interactive/button/Button.svelte';
	import type { HeaderStoryblok } from './headerTypes';

	let { blok }: { blok: HeaderStoryblok } = $props();
	let mobileMenuActive = $state(false);
	let isFixed = $state(blok.fixed_to_top ? true : false);

	const toggleMobileMenuActive = () => {
		mobileMenuActive = !mobileMenuActive;
	};

	// STYLING - STYLING - STYLING - STYLING - STYLING - STYLING - STYLING - STYLING - STYLING - STYLING -

	const HEADER_BASE_STYLES = `z-30 flex w-full justify-center transition-all md:px-6 md:pt-5`;
	let HEADER_FIXED_STYLES = $state(isFixed ? `fixed top-0 left-0 ` : '');
	let HEADER_STYLES = $state(`${HEADER_BASE_STYLES} ${HEADER_FIXED_STYLES}`);

	const NAV_BASE_STYLES = `bg-header-surface-primary grid w-full grid-cols-1 grid-rows-[1fr_max-content]
	items-center justify-between transition-all md:flex md:max-w-[60rem] md:flex-row md:rounded-full md:px-6`;

	const LOGO_BURGER_CONTAINER_STYLES = `flex min-h-[6.25rem] w-full flex-row items-center justify-between px-5
			transition-all md:min-h-20 md:w-max md:px-0`;
</script>

<header id="header" class={HEADER_STYLES}>
	<div class={NAV_BASE_STYLES}>
		<!-- This may looks weird. We store logo and burger menu for mobile
		due to how we structured HTML/CSS.-->
		<div in:fly={{ x: -30, duration: 200 }} class={LOGO_BURGER_CONTAINER_STYLES}>
			{#if blok.logo && blok.logo.length > 0}
				<Logo blok={blok.logo[0]}></Logo>
			{/if}
			<BurgerMenu {mobileMenuActive} {toggleMobileMenuActive}></BurgerMenu>
		</div>

		<!-- All navigation links are in those 2 components -->
		{#if blok.nav_links && blok.nav_links.length > 0}
			<MobileNav {mobileMenuActive} links={blok.nav_links} {toggleMobileMenuActive}></MobileNav>
			<TabletDesktopNav links={blok.nav_links}></TabletDesktopNav>
		{/if}

		<!-- Optional button -->
		<div class="lt:block hidden">
			{#if blok.button && blok.button.length > 0}
				<Button blok={blok.button[0]}></Button>
			{/if}
		</div>
	</div>
</header>

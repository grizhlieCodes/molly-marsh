<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';
	import BurgerMenu from './BurgerMenu.svelte';
	import MobileNav from './MobileNav.svelte';
	import TabletDesktopNav from './TabletDesktopNav.svelte';
	import { fly } from 'svelte/transition';
	import Logo from './Logo.svelte';
	import Button from '$lib/components/ui-interactive/button/Button.svelte';

	let { blok }: { blok: any } = $props(); // Storyblok
	$effect(() => console.log(blok.button[0]));

	let mobileMenuActive = $state(false);

	const toggleMobileMenuActive = () => {
		mobileMenuActive = !mobileMenuActive;
	};

	// Options I can think of:
	// Fixed or not fixed? Where does this come from?
	// If not fixed " fixed / '' "
	// Links + Sublinks of course. [{},{}]
	// Logo Text (Molly Marsh)

	let HEADER_BASE_STYLING = `
	
	
	`;
</script>

<!-- class="
lt:-translate-x-1/2 lt:left-1/2 lt:max-w-[60rem]
bg-header-surface-primary border-header-outline-primary/50 lt:top-10 lt:rounded-full fixed
top-0 left-0 z-[999] flex w-full justify-center
border backdrop-blur-[35px] backdrop-filter transition-all" -->

<!-- 

lt:flex lt:items-center lt:justify-between lt:justify-items-center
				lt:gap-2 lt:px-6 grid {mobileMenuActive ? 'gap-6' : ''}  grid-rows-[1fr_max-content]
				flex-row py-6 lt:py-2 transition-all

-->

<header
	id="header"
	class="fixed top-0 left-0 z-30 flex w-full justify-center
 transition-all md:px-6 md:pt-5"
>
	<div
		class="bg-header-surface-primary grid w-full grid-cols-1 grid-rows-[1fr_max-content]
	items-center justify-between transition-all md:flex md:max-w-[60rem]
		 md:flex-row md:px-6 md:rounded-full
		"
	>
		<div
			in:fly={{ x: -30, duration: 200 }}
			class="flex min-h-[6.25rem] md:min-h-20 w-full flex-row items-center justify-between
			px-5 transition-all md:w-max md:px-0
		"
		>
			<Logo blok={blok.logo}></Logo>
			<BurgerMenu {mobileMenuActive} {toggleMobileMenuActive}></BurgerMenu>
		</div>

		<MobileNav {mobileMenuActive} links={blok.nav_links} {toggleMobileMenuActive}></MobileNav>
		<TabletDesktopNav links={blok.nav_links}></TabletDesktopNav>
		<div class="hidden lg:block">
			<Button blok={blok.button[0]}></Button>
		</div>
	</div>
</header>

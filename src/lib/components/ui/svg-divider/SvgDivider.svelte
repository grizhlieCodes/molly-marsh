<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import * as ops from './svgDividerOptions';
	import type * as Type from './svgDividerTypes';

	type IconPaths = {
		[key: string]: string;
	};

	let { blok }: { blok: Type.SvgDividerStoryblok } = $props();

	const VIEW_BOX = '0 0 72 72';

	const paths: IconPaths = {
		dotsAscending: `<path fill-rule="evenodd" clip-rule="evenodd"
		d="M47 21C47 27.0751 42.0751 32 36 32C29.9249 32 25 27.0751 25 21C25 14.9249 29.9249 10 36 10C42.0751 10 47 14.9249 47 21ZM41.5 44.3748C41.5 47.4123 39.0376 49.8748 36 49.8748C32.9625 49.8748 30.5 47.4123 30.5 44.3748C30.5 41.3372 32.9625 38.8748 36 38.8748C39.0376 38.8748 41.5 41.3372 41.5 44.3748ZM36 62.25C37.5188 62.25 38.75 61.0187 38.75 59.5C38.75 57.9812 37.5188 56.75 36 56.75C34.4813 56.75 33.25 57.9812 33.25 59.5C33.25 61.0187 34.4813 62.25 36 62.25Z"
	/>`,
		dotsStacked: `<path fill-rule="evenodd" clip-rule="evenodd"
		d="M39.9266 14.0192C39.9266 16.239 38.1467 18.0385 35.9511 18.0385C33.7554 18.0385 31.9755 16.239 31.9755 14.0192C31.9755 11.7995 33.7554 10 35.9511 10C38.1467 10 39.9266 11.7995 39.9266 14.0192ZM43.9022 36.125C43.9022 40.5645 40.3424 44.1635 35.9511 44.1635C31.5598 44.1635 28 40.5645 28 36.125C28 31.6855 31.5598 28.0865 35.9511 28.0865C40.3424 28.0865 43.9022 31.6855 43.9022 36.125ZM35.9511 62.25C38.1467 62.25 39.9266 60.4504 39.9266 58.2308C39.9266 56.011 38.1467 54.2115 35.9511 54.2115C33.7554 54.2115 31.9755 56.011 31.9755 58.2308C31.9755 60.4504 33.7554 62.25 35.9511 62.25Z"
	/>`,
		arrowArcUp: `<path d="M19 55.2837C20.7138 56.3713 22.4275 56.0279 23.964 55.5127C26.0914 54.7685 28.1598 53.7953 30.0508 52.6504C38.6196 47.155 43.7609 39.3124 45.8883 29.6381C46.4202 27.1766 46.5975 24.6006 46.952 21.7956C49.3158 23.1122 50.5569 25.6882 52.9207 27.1766C53.2161 26.0317 52.6252 25.2875 52.1524 24.6578C50.2023 22.0818 48.193 19.5058 46.1247 16.987C45.1201 15.7849 44.3518 15.6704 43.2881 16.7008C41.0425 18.8189 39.6833 21.3949 39.2697 24.3716C39.2697 24.4861 39.4469 24.6578 39.6833 24.944C42.2244 24.3144 41.6335 21.1659 43.82 20.021C44.7655 23.9709 44.0564 27.749 42.9927 31.4127C41.8698 35.2481 40.3925 38.9117 38.0287 42.1747C35.7239 45.3804 32.8283 47.9564 29.6371 50.3606C26.5051 52.8222 22.9594 54.3678 19 55.2837Z"
	/>`,
		arrowSquiggleDown: `<path d="M41.1363 54.7278C41.3972 54.6953 41.495 54.7278 41.5929 54.6953C47.5617 51.1277 51.6062 46.0682 53.1391 39.2574C53.5305 37.5384 53.4653 35.7546 53.0087 34.0033C52.0628 30.2411 48.899 27.6465 45.0176 27.4194C42.9954 27.2897 41.0384 27.5167 39.2771 28.6194C39.1466 29.56 39.0488 30.5005 38.8531 31.3762C38.5269 32.8032 37.7767 33.9708 36.4395 34.6843C35.461 35.2357 34.4825 35.2357 33.9606 34.7168C33.2757 34.0357 33.2757 33.1276 33.6997 32.3816C34.2868 31.3438 35.0043 30.3708 35.7545 29.4627C36.2438 28.8789 36.8961 28.3924 37.4832 27.9059C36.9287 24.241 33.4387 22.6842 29.2638 24.2086C29.1334 24.7275 29.0029 25.2789 28.8398 25.7978C28.1875 27.7113 26.9807 29.1708 25.0237 29.8519C24.2735 30.1113 23.4581 30.2086 22.8057 29.5275C22.3165 29.0086 22.3165 28.1005 22.8384 27.1924C23.6864 25.7654 24.9584 24.7599 26.3283 23.8843C26.8176 23.5924 27.3068 23.3005 27.7961 23.041C27.1438 17.3653 22.0229 13.3436 17 15.6139C17.0326 15.1923 17 14.8355 17.1305 14.6409C17.2935 14.4139 17.6523 14.2842 17.9459 14.2193C20.7183 13.7004 23.295 14.0247 25.4151 16.0355C27.0133 17.5274 28.0896 19.3437 28.8072 21.4194C28.905 21.7113 29.0029 22.0032 29.1334 22.2951C29.1334 22.3275 29.1986 22.3599 29.3291 22.4572C29.6226 22.4248 29.9814 22.4248 30.3402 22.3599C34.7108 21.6788 36.9939 22.8464 39.0162 26.9005C39.4076 26.7708 39.8642 26.641 40.2882 26.4789C42.7997 25.6356 45.3112 25.5708 47.8553 26.414C51.9976 27.7762 54.6721 31.3113 54.9657 35.7871C55.1288 38.2195 54.7047 40.5547 53.8241 42.825C51.6714 48.3061 48.1488 52.6196 42.8649 55.4413C42.604 55.6034 42.3104 55.7332 42.0495 55.8953C42.0169 55.9278 41.9843 55.9926 41.8864 56.1872C42.9954 56.4467 44.0391 56.3494 45.0829 56.2845C46.094 56.2521 47.1377 56.1548 48.2467 56.0899C48.1488 56.9332 47.6922 57.2575 47.1377 57.4521C46.4854 57.6467 45.833 57.9062 45.1807 57.9386C43.4194 58.0035 41.6255 58.0359 39.8316 57.9386C38.4291 57.8413 38.0377 57.0953 38.6574 55.9602C39.9947 53.5602 41.3646 51.1602 42.7345 48.7601C42.9628 48.3709 43.2563 48.0466 43.6151 47.5926C44.2348 48.3061 43.9739 48.825 43.7456 49.3115C42.8323 51.0629 42.0169 52.8142 41.1363 54.7278ZM23.7842 28.5546C26.0348 28.2627 27.4373 26.8356 27.5351 24.8248C26.0348 25.7978 24.5997 26.6735 23.7842 28.5546ZM34.8086 33.5816C36.733 33.1276 37.6463 31.8303 37.4506 29.8519C36.2112 30.8897 35.1348 31.8627 34.8086 33.5816Z"
	/>`
	};

	let path = $state(paths[blok.svg]);

	let BASE_SVG_STYLING = `fill-inherit stroke-inherit transition-colors duration-200 absolute`;
	let SVG_STYLES_OBJ = $state({
		width: ops.widthOptions[blok.width.value] ?? ops.widthOptions[5],
		height: ops.heightOptions[blok.height.value] ?? ops.heightOptions[0],
		fillCol: ops.fillColorOptions[blok.fill_color] ?? '',
		strokeCol: ops.strokeColorOptions[blok.stroke_color] ?? ''
	});

	let SVG_STYLING = $state(`${Object.values(SVG_STYLES_OBJ).join(' ')} ${BASE_SVG_STYLING}`);
	let rotate = $state(`${blok.rotate.value}deg`);

	let svgPositions = $state({
		top: blok.top_absolute_value && blok.top_absolute_value.value > 0 ? `top: ${blok.top_absolute_value.value}${blok.top_absolute_unit};` : '',
		right: blok.right_absolute_value && blok.right_absolute_value.value > 0 ? `right: ${blok.right_absolute_value.value}${blok.right_absolute_unit};` : '',
		bottom: blok.bottom_absolute_value && blok.bottom_absolute_value.value > 0 ? `bottom: ${blok.bottom_absolute_value.value}${blok.bottom_absolute_unit};` : '',
		left: blok.left_absolute_value && blok.left_absolute_value.value > 0 ? `left: ${blok.left_absolute_value.value}${blok.left_absolute_unit};` : ''
	});
	let svgTranslates = $state({
		vertical: blok.y_translate_value && blok.y_translate_unit && blok?.y_translate_unit?.length > 0 ? `${blok.y_translate_value.value}${blok.y_translate_unit}` : 0,
		horizontal: blok.x_translate_value && blok.x_translate_unit && blok?.x_translate_unit?.length > 0 ? `${blok.x_translate_value.value}${blok.x_translate_unit}` : 0
	});

	// Inline SVG Styling
	let translate = $state(`${svgTranslates.horizontal} ${svgTranslates.vertical}`);

	let svgPositionStyles = $state(`${svgPositions.top} ${svgPositions.right} ${svgPositions.bottom} ${svgPositions.left} `);
	let flipHorizontally = $state(`${blok.flip_horizontally ? 'scale: -100% 100%;' : ''}`);
	// let SVG_INLINE_STYLES = $state(`${svgPositionStyles} ${blok.custom_svg_classes} ${flipHorizontally}`);
</script>

{#if blok.svg && blok.svg.length > 0}
	<div use:storyblokEditable={blok} style={blok.custom_container_css} class="relative min-h-10 w-full">
		<svg xmlns="http://www.w3.org/2000/svg" class={SVG_STYLING} viewBox={VIEW_BOX} style="{svgPositionStyles} {flipHorizontally}" style:translate style:rotate>
			{@html path}
		</svg>
	</div>
{/if}

<script lang="ts">
	import type { ImageStoryblok } from './imageTypes';
	import * as ops from './imageOptions';
	import { storyblokEditable } from '@storyblok/svelte';

	const getPositionValue = (value: string | undefined | null) => {
		return (!value || value.toString() === '') ? undefined : value.trim();
	}

	let { blok }: { blok: ImageStoryblok } = $props();

	let borderRadius = $state(ops.borderRadiusOptions[blok.border_radius.value] ?? ops.borderRadiusOptions[0]);
	// let borderRadiusBefore = $state(ops.beforeBorderRadiusOptions[blok.border_radius.value] ?? ops.beforeBorderRadiusOptions[0]);
	// let borderRadiusAfter = $state(ops.afterBorderRadiusOptions[blok.border_radius.value] ?? ops.afterBorderRadiusOptions[0]);

	let IMAGE_BASE_STYLES = `h-full w-full object-cover`;
	let imageStylesObj = $state({
		// objectPosition: ops.objectPositionOptions[blok.object_position] ?? ops.objectPositionOptions.center,
		mixBlendmode: ops.mixBlendModeOptions[blok.mix_blendmode] ?? ops.mixBlendModeOptions.normal,
		blurFilter: ops.blurFilterOptions[blok.blur_filter.value] ?? ops.blurFilterOptions[0],
		grayscaleFilter: ops.grayscaleFilterOptions[blok.grayscale_filter.value] ?? ops.grayscaleFilterOptions[0],
		sepiaFilter: ops.sepiaFilterOptions[blok.sepia_filter.value] ?? ops.sepiaFilterOptions[0],
		invertFilter: ops.invertFilterOptions[blok.invert_filter.value] ?? ops.invertFilterOptions[0],
		saturateFilter: ops.saturateFilterOptions[blok.saturate_filter.value] ?? ops.saturateFilterOptions[0],
		contrastFilter: ops.contrastFilterOptions[blok.contrast_filter.value] ?? ops.contrastFilterOptions[0]
	});

	let IMG_OBJECT_POSITION = `object-[var(--object-pos-def,_unset)]  object-[var(--object-pos-mm,_var(--object-pos-def))]  object-[var(--object-pos-lm,_var(--object-pos-mm))]  object-[var(--object-pos-md,_var(--object-pos-lm))]  object-[var(--object-pos-lg,_var(--object-pos-md))] `;

	let imageStyles = $state(`${Object.values(imageStylesObj).join(' ')} ${IMAGE_BASE_STYLES} ${borderRadius} ${IMG_OBJECT_POSITION}`);

	let CONTAINER_BASE_STYLES = `relative h-full w-full`;
	let containerStylesObj = $state({
		aspectRatio: ops.aspectRatioOptions[blok.aspect_ratio] ?? ops.aspectRatioOptions['1:1'],
		maxWidth: ops.maxWidthOptions[blok.max_width] ?? ops.maxWidthOptions.none,
		maxHeight: ops.maxHeightOptions[blok.max_height] ?? ops.maxHeightOptions.none
	});
	let containerStyles = $state(`${Object.values(containerStylesObj).join(' ')} ${CONTAINER_BASE_STYLES}`);

	let decorativeImg: boolean = $state(blok.decorative_image === true ? true : false);
	let figCaption: string = $state(blok.figcaption ?? '');
	let baseImageWidth: number = $state(blok.base_width.value ?? 500);
	let imageSizes = $state(ops.imageQualityOptions[blok.image_quality] ?? ops.imageQualityOptions.large);
	let minHeight = $state(blok.min_height.value && blok.min_height.value !== 0 ? `${blok.min_height.value}${blok.min_height_unit}` : '');
	let image = $state(blok.image);
	let isLoading = $state(true);

	let showCustomDecoration = $state(blok.custom_decoration && blok.custom_decoration.length > 0);
	let customDecorationStyling = $state(
		showCustomDecoration
			? `${ops.customDecorationOptions[blok.custom_decoration]} ${ops.beforeBorderRadiusOptions[blok.border_radius.value] ?? ops.beforeBorderRadiusOptions[0]} ${ops.afterBorderRadiusOptions[blok.border_radius.value] ?? ops.afterBorderRadiusOptions[0]}`
			: undefined
	);

	$inspect({
		def: blok.object_position_default,
		mm: blok.object_position_mm,
		lm: blok.object_position_lm,
		md: blok.object_position_md,
		lg: blok.object_position_lg
	});
</script>

<div
	use:storyblokEditable={blok}
	style:min-height={minHeight}
	class="{containerStyles} {customDecorationStyling} z-5"
	style:--object-pos-def={getPositionValue(blok.object_position_default) || undefined}
	style:--object-pos-mm={getPositionValue(blok.object_position_mm) || 'var(--object-pos-def)'}
	style:--object-pos-lm={getPositionValue(blok.object_position_lm) || 'var(--object-pos-mm)'}
	style:--object-pos-md={getPositionValue(blok.object_position_md) || 'var(--object-pos-lm)'}
	style:--object-pos-lg={getPositionValue(blok.object_position_lg) || 'var(--object-pos-md)'}
>
	<picture class="h-full w-full">
		<!-- Low Quality Placeholder -->
		{#if isLoading}
			<img
				src="{blok.image.filename}/m/300x0"
				class="h-full w-full
			border object-cover"
				role="presentation"
				alt={undefined}
			/>
		{/if}
		<!-- Main Image -->
		{#each imageSizes as { width, media }}
			<source {media} srcset="{blok.image.filename}/m/{width}x0" type="image/webp" />
		{/each}
		<img
			src="{blok.image.filename}/m/{baseImageWidth}x0"
			alt={decorativeImg ? '' : blok.image.alt}
			class={imageStyles}
			loading="lazy"
			role={decorativeImg ? 'presentation' : undefined}
			onload={() => {
				isLoading = false;
			}}
		/>
	</picture>
</div>

<!-- <style> -->
<!-- /* :global {
		.object-position-top-20 {
			object-position: 50% 40%;
		}
	} */ -->
<!-- </style> -->

<script lang="ts">
	import { StoryblokComponent, storyblokEditable } from '@storyblok/svelte';
	import { CircleCheck, Star } from 'lucide-svelte';
	import * as textOptions from '$lib/components/ui/text/textOptions';

	// Props
	// Card Title -> Text
	// Card Description -> Text
	// Price = number -> Some logic to just print "FREE" if number is 0
	// Price helper text ("Save 10%")
	// Card Info Points -> array of simple text? or do i allow myself to put
	// anything I want in here?
	// Card Button
	// SimpleUrlButton
	// ExternalPriceButton (Stripe)
	// Recommended? -> Wtf do I do with this?

	let {
		blok,
		card_title,
		card_description,
		card_price,
		card_price_helper_text,
		card_info_points,
		card_button,
		card_recommended_option
	}: {
		blok: any;
		card_title: string;
		card_description: string;
		card_price: any;
		card_price_helper_text: any;
		card_info_points: any;
		card_button: any;
		card_recommended_option: any;
	} = $props();

	let { textStyles } = $state(textOptions);

	// $inspect(blok);
</script>

<article
	use:storyblokEditable={blok}
	class=" flex w-full max-w-[24rem] flex-col bg-white  shadow-lg
justify-between gap-8 rounded-lg  p-5
{blok.card_recommended_option ? `border-surface-primary-700 border-2` : `border-surface-primary-700/30  border`}
"
>
	<div class="flex flex-col gap-6">
		<div class="flex flex-col gap-3.5">
			<div class="flex flex-nowrap justify-between">
				{#if blok.card_title && blok.card_title.length > 0}
					<div
						class="w-max max-w-[80%] {textStyles.para6}
                text-body-primary-800 font-medium"
					>
						<h4>{blok.card_title}</h4>
					</div>
				{/if}
				{#if blok.card_recommended_option}
					<div
						class="bg-surface-primary-100 flex items-center justify-center gap-1 rounded-full
                px-3 py-1 {textStyles.para3} h-max w-max"
					>
						<Star class="fill-surface-primary-600 w-3.5 stroke-0"></Star>
						<span class="font-body text-body-primary-700 font-[550]"> Recommended </span>
					</div>
				{/if}
			</div>
			<div class="price-container flex items-end gap-4">
				{#if blok.card_price && blok.card_price.length > 0}
					<span class="price {textStyles.para9} text-body-neutral-900 font-medium">
						{blok.card_price === '0.00' ? 'FREE' : '£' + blok.card_price}
						<!-- {blok.card_price} -->
					</span>
				{/if}
				{#if blok.card_price_helper_text && blok.card_price_helper_text.length > 0}
					<span
						class="price_helper_text {textStyles.para4}
				-translate-y-[1px] font-[450] text-neutral-400"
					>
						{blok.card_price_helper_text}
					</span>
				{/if}
			</div>
		</div>

		<div class="price-card-description-container">
			{#if blok.card_description && blok.card_description.length > 0}
				<p class={textStyles.para6}>
					{blok.card_description}
				</p>
			{/if}
		</div>
		<span class="bg-surface-primary-800/20 block h-[1px] w-full"></span>
		<ul class="card_info-points flex list-none list-image-none flex-col gap-1.5">
			{#if blok.card_info_points && blok.card_info_points.length > 0}
				{#each blok.card_info_points as point, i}
					<li class="flex w-max items-center justify-center gap-2">
						<div class="icon-container fill-surface-primary-600 w-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24
						24"
								class="size-full fill-inherit"
							>
								<path
									fill-rule="evenodd"
									d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>

						<span class="{textStyles.paraBase} !text-body-neutral-500 font-[450]">{point.text}</span>
					</li>
				{/each}
			{/if}
		</ul>
	</div>

	<div class="w-full">
		{#if blok.card_button && blok.card_button.length > 0}
			<StoryblokComponent blok={blok.card_button[0]} recommended={blok.card_recommended_option}></StoryblokComponent>
		{/if}
	</div>
</article>

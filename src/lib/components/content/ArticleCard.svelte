<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import { fly } from 'svelte/transition';
	import { formatNoteDate } from '$lib/scripts/utils';
	import * as ops from '$lib/components/ui/text/textOptions';

	let {
		article_title,
		article_tag,
		article_summary,
		article_cover_image,
		article_date,
		article_content,
		article_slug,
		bloks
	}: {
		article_title: string;
		article_tag: any;
		article_summary: any;
		article_cover_image: any;
		article_date: any;
		article_content: any;
		article_slug: string;
		bloks: any;
	} = $props();
</script>

<!-- <pre class="whitespace-pre-wrap break-words w-full h-max">
    {JSON.stringify(article_cover_image)}
</pre> -->
<a
	href="/blog/{article_slug}"
	aria-label="Open the article titled
{article_title}"
	class="bg-surface-primary-50 border-surface-primary-200 group hover:bg-surface-primary-100/80 flex w-full max-w-[30rem]
flex-col gap-0 overflow-hidden rounded-lg border
transition-all duration-500 sm:min-h-[16.25rem] sm:max-w-none
sm:flex-row"
>
	<div
		class="relative aspect-square w-full bg-red-200
	sm:max-h-none sm:max-w-[16.25rem]"
	>
		<img
			src="{article_cover_image.filename}/m/500x0"
			alt={article_cover_image.alt}
			class="absolute inset-0 h-full w-full
		object-cover object-center"
		/>
	</div>
	<div class="flex flex-col justify-between gap-4 px-8 py-5">
		<!-- Tags container -->
		<div class="flex flex-col gap-2">
			<div class="flex gap-2">
				<span
					class="bg-surface-primary-100 border-surface-primary-200 text-body-primary-600
                 overflow-hidden rounded-full border px-2
                 py-0.5 text-sm"
				>
					{formatNoteDate(article_date)}
				</span>
				<!-- <span
					class="bg-surface-primary-100 border-surface-primary-200 text-body-primary-600
                overflow-hidden rounded-full border px-2
                py-0.5 text-sm"
				>
					{article_tag.content.tag_label_short}
				</span> -->
				<Tooltip.Root openDelay={250}>
					<Tooltip.Trigger
						class="bg-surface-primary-100 border-surface-primary-200 text-body-primary-600
                overflow-hidden rounded-full border px-2
                py-0.5 text-sm"
					>
						{article_tag.content.tag_label_short}
					</Tooltip.Trigger>
					<Tooltip.Content transition={fly} transitionConfig={{ y: 8, duration: 150 }}>
						<div class="bg-surface-primary-400">
							<Tooltip.Arrow class="border-surface-primary-400 rounded-[2px] border-t border-l"></Tooltip.Arrow>
						</div>
						<div
							class="text-body-primary-500 border-surface-primary-400 bg-surface-primary-100
						flex max-w-96 items-center justify-center
						rounded-2xl border px-2 py-1 text-center
						text-base font-medium shadow-md outline-hidden
						"
						>
							{article_tag.content.tag_full}
						</div>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>

			<!-- Text Container -->
			<div class="flex flex-col gap-4 text-left">
				<h3 class="font-heading text-xl md:text-2xl lg:text-3xl text-emerald-700">{article_title}</h3>
				<p class={ops.textStyles.paraBase}>{article_summary}</p>
			</div>
		</div>

		<div
			class="bg-surface-primary-100 border-surface-primary-200 group-hover:bg-surface-primary-800 w-max rounded-2xl
		border px-3 py-1 transition-all
		duration-500"
		>
			<span
				class="font-special text-body-primary-700 text-sm
			font-[600] transition-colors duration-500 group-hover:text-white"
			>
				READ ARTICLE
			</span>
		</div>
	</div>
</a>

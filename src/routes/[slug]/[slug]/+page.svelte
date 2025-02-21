<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import { fly } from 'svelte/transition';
	import { formatNoteDate } from '$lib/scripts/utils';
	import { renderRichText } from '@storyblok/svelte';
	let { data }: { data: any } = $props();
	let article = $state(data.article.content);
	// $inspect(article);
</script>

<svelte:head>
	<title>Molly Marsh - {article.article_title}</title>
</svelte:head>

<section class="mx-auto w-full max-w-[60rem] px-6 py-24 md:px-8 lg:px-10 2xl:px-0" aria-labelledby="article-container_heading" id="article-container">
	<article class="flex w-full flex-col items-center overflow-hidden rounded-2xl px-6 py-10 lg:shadow-2xl">
		<!-- Metadata -->

		<!-- Article -->
		<div
			class="prose prose-lg prose-headings:font-heading prose-p:font-body
		max-w-[70ch]"
		>
			<div class="mb-4 flex gap-2">
				<span
					class="bg-surface-secondary-100 border-surface-secondary-200 text-body-secondary-500
             overflow-hidden rounded-full border px-2
             py-0.5 text-sm"
				>
					{formatNoteDate(article.article_date)}
				</span>
				<Tooltip.Root openDelay={250}>
					<Tooltip.Trigger
						class="bg-surface-secondary-100 border-surface-secondary-200 text-body-secondary-500 overflow-hidden rounded-full border px-2
                    py-0.5 text-sm"
					>
						{article.article_tag.content.tag_label_short}
					</Tooltip.Trigger>
					<Tooltip.Content transition={fly} transitionConfig={{ y: 8, duration: 150 }}>
						<div class="bg-surface-secondary-400">
							<Tooltip.Arrow class="border-surface-secondary-400 rounded-[2px] border-t border-l"></Tooltip.Arrow>
						</div>
						<div
							class="text-body-secondary-500 border-surface-secondary-400 bg-surface-secondary-100
                    flex max-w-96 items-center justify-center
                    rounded-2xl border px-2 py-1 text-center
                    text-base font-medium shadow-md outline-hidden
                    "
						>
							{article.article_tag.content.tag_full}
						</div>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
			<h1 class="font-[550]">{article.article_title}</h1>
			{@html renderRichText(article.article_content)}
		</div>
	</article>
</section>

<!-- Blocks -->

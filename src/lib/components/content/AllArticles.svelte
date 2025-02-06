<script lang="ts">
	interface ArticleContent {
		component: string;
		article_date: string;
		article_title: string;
		article_tag: string;
		article_summary: string;
		article_content: {
			type: string;
			content: any[]; // You could define this more specifically if needed
		};
		article_cover_image: {
			id: number;
			alt: string;
			filename: string;
			// ... other image properties
		};
	}

	interface Article {
		id?: number;
		uuid?: string;
		name: string;
		slug?: string;
		content: ArticleContent;
		created_at?: string;
		published_at?: string;
	}

	import { Tooltip } from 'bits-ui';
	import { getContext } from 'svelte';
	import ArticleCard from './ArticleCard.svelte';
	let articlesData: any = $state(getContext('articles'));
	let allArticles = $state(articlesData());
	let tagsData: any = $state(getContext('tags'));
	let allTags = $state(tagsData());

	// Article Filtering
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { Select } from 'bits-ui';
	import { Check, ChevronDown } from 'lucide-svelte';

	const sorts = [
		{ value: 'date_newest', label: 'Date (Newest)' },
		{ value: 'date_oldest', label: 'Date (Oldest)' },
		{ value: 'alph_a-z', label: 'Alphabetical (A-Z)' },
		{ value: 'alph_z-a', label: 'Alphabetical (Z-A)' }
	];
	$inspect('TAGS =============== ', allTags);
	const filterTags = [
		{
			content: {
				tag_data: 'strategy',
				tag_full: 'Practical strategies',
				tag_label_short: 'Strategy'
			}
		},
		...allTags
	];

	let sortOpen: any = $state(null);
	let filterOpen: any = $state(null);
	let previousSelected: any = $state({ label: '', value: '' });
	let sortSelected: any = $state({ value: 'date_newest', label: 'Date (Newest)' });

	// $inspect('Articles run again: ', allArticles);

	// TOGGLE GROUP

	import { ToggleGroup } from 'bits-ui';
	let previousGroupBind: string[] = $state([]);
	let groupBind: string[] = $state(['all']);

	const updateFilterGroupBind = (oldArray: string[], newArray: string[]) => {
		const oldArrayHasAll = oldArray.includes('all');
		const newArrayHasAll = newArray.includes('all');
		const newArrayLongerThanTwo = newArray.length >= 2;
		if ((oldArrayHasAll || oldArray.length === 0) && newArrayHasAll && newArrayLongerThanTwo) {
			groupBind = newArray.filter((i) => i !== 'all');
			previousGroupBind = [...groupBind];
			return;
		}
		if (newArray.length === 0 || (!oldArrayHasAll && newArrayHasAll && newArrayLongerThanTwo)) {
			groupBind = ['all'];
			previousGroupBind = ['all'];
			return;
		}
	};

	$effect(() => updateFilterGroupBind(previousGroupBind, groupBind));
	$effect(() => {
		const filteredArticles: any =
			groupBind.includes('all') || groupBind.length === 0
				? articlesData()
				: articlesData().filter((article: any) => {
						return groupBind.includes(article.content.article_tag.content.tag_data);
					});

		const sorted = [...filteredArticles];

		switch (sortSelected.value) {
			case 'date_newest':
				sorted.sort((a: Article, b: Article) => new Date(b.content.article_date).getTime() - new Date(a.content.article_date).getTime());
				break;
			case 'date_oldest':
				sorted.sort((a: Article, b: Article) => new Date(a.content.article_date).getTime() - new Date(b.content.article_date).getTime());
				break;
			case 'alph_a-z':
				sorted.sort((a: Article, b: Article) => a.content.article_title.localeCompare(b.content.article_title, undefined, { sensitivity: 'base' }));
				break;
			case 'alph_z-a':
				sorted.sort((a: Article, b: Article) => b.content.article_title.localeCompare(a.content.article_title, undefined, { sensitivity: 'base' }));
				break;
		}

		allArticles = sorted;
	});
</script>

<div class="flex w-full flex-col items-center gap-20">
	<div class="lm:flex-row flex w-full flex-col flex-wrap justify-center gap-2">
		<Select.Root items={sorts} bind:open={sortOpen} preventScroll={false} bind:selected={sortSelected} closeOnEscape={true}>
			<Select.Trigger
				class="bg-surface-primary-50 border-surface-primary-100 text-body-primary-700 hover:bg-surface-primary-200 focus-within:bg-surface-primary-200
			flex cursor-pointer items-center justify-between 
			gap-1 rounded-xl border px-3 py-2 outline-hidden
			"
				aria-label="select a sorting option"
			>
				<p class="text-lg">Sort</p>
				<!-- <Select.Value class="text-sm text-slate-500" placeholder="Select sort"></Select.Value> -->
				<ChevronDown
					class="w-6 stroke-[0.8px]
                transition-transform duration-300 {sortOpen ? 'rotate-180' : ''}"
				></ChevronDown>
			</Select.Trigger>
			<Select.Content
				sameWidth={false}
				class=" border-surface-primary-200 bg-surface-primary-50 w-[14rem] rounded-xl
            border border-solid px-1 py-3 shadow-xl outline-hidden"
				transition={fly}
				transitionConfig={{ y: 15, opacity: 0, duration: 200 }}
				sideOffset={8}
			>
				{#each sorts as sort, i}
					<Select.Item
						class="data-highlighted:bg-surface-primary-200 flex w-full items-center
                     justify-between rounded-md px-5 py-3
                     text-base outline-hidden transition-all duration-200 select-none"
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

		<ToggleGroup.Root
			bind:value={groupBind}
			class="bg-surface-primary-50 border-surface-primary-100 text-body-primary-700 lm:flex-row
			lm:flex-none flex flex-1 flex-col items-center justify-end gap-1 rounded-xl border px-3 py-2 text-center outline-hidden"
		>
			<ToggleGroup.Item
				value="all"
				class="  data-[state=on]:bg-surface-primary-700 flex
			w-full cursor-pointer items-center justify-center
                     rounded-md p-2 px-3 py-2 text-base
			font-[500] outline-hidden transition-all duration-200
			select-none data-[state=on]:text-white
			">All</ToggleGroup.Item
			>
			{#each allTags as tag, i (tag.id)}
				<ToggleGroup.Item
					value={tag.content.tag_data}
					class="group w-full     
                "
				>
					<Tooltip.Root openDelay={250}>
						<Tooltip.Trigger
							class="group-data-[state=on]:bg-surface-primary-700 flex
			 w-full cursor-pointer items-center
                    justify-center rounded-xl p-2 px-3
					py-2 text-base font-[500] outline-hidden
					transition-all  duration-200 select-none
                group-data-[state=on]:text-white"
						>
							<span class="block md:hidden">{tag.content.tag_label_short}</span>
							<span class="hidden w-max md:block">{tag.content.tag_full}</span>
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
								{tag.content.tag_full}
							</div>
						</Tooltip.Content>
					</Tooltip.Root>
					<!-- {tag.content.tag_label_short} -->
				</ToggleGroup.Item>
			{/each}
		</ToggleGroup.Root>

		<!-- <ArticleSortFilter sortOptions={sorts} {sortSelected} {sortOpen}></ArticleSortFilter> -->
	</div>
	<div class="flex w-full flex-col items-center gap-4 md:gap-8">
		{#each allArticles as article, i (article.id)}
			<div animate:flip={{ duration: 400 }} class="w-full">
				<ArticleCard {...article.content} article_slug={article.slug}></ArticleCard>
			</div>
		{/each}
	</div>
</div>

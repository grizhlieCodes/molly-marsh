<script lang="ts">
	import { getContext } from 'svelte';
	let articlesData: any = $state(getContext('articles'));
	let allArticles = $state(articlesData());
</script>


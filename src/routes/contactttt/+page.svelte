<script lang="ts">
	import Form from '$lib/components/form/Form.svelte';

	let { data }: { data: any } = $props();
	let superformData = $state(data.form);
	// $inspect(superformData);
</script>

<div class="flex h-full w-full items-center justify-center py-24">
	<Form blok={data.contactFormPageData} {superformData}></Form>
</div>

<script lang="ts">
	let { data }: { data: any } = $props();
	// $inspect(data.formVali);
</script>

<div class="flex min-h-screen w-full flex-col items-center justify-center gap-4">
	<h1>{data.serverMessage}</h1>
	<h1>{data.universalMessage}</h1>
</div>

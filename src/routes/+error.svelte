<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex flex-col items-center justify-center gap-6 py-24" style="--shadow-offset: 0rem; --outline-size: 0rem; --outline-offset: 0rem;">
	<p>We apologise for this error. Please return to the homepage to reload this site.</p>
	<a
		href="/"
		class="bg-surface-primary-800 text-body-primary-50 outline-surface-primary-700
	outline-offset-(outline-offset) h-max w-max cursor-pointer rounded-lg border-0 px-4 py-2
	uppercase shadow-[0_0_0_0rem_var(--color-surface-primary-600)] outline-0
	transition-all duration-200 outline-solid
    not-active:not-focus-visible:hover:shadow-[0_0_0_0.75rem_var(--color-surface-primary-600)]
    focus-visible:outline-2
    not-active:focus-visible:outline-offset-8"
		data-sveltekit-reload>Return to homepage</a
	>
	<p>{page?.error?.message}</p>
</div>

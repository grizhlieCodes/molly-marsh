<script lang="ts">
	let { data }: { data: any } = $props();
	import type { StripeSuccessfulCheckoutSession } from '$lib/integrations/stripe/schemas';
	let { sessionData, error }: { sessionData: StripeSuccessfulCheckoutSession; error: string } = $derived(data);
	import { formatNoteDate } from '$lib/scripts/utils';

	$inspect(sessionData);

	import * as ops from '$lib/components/ui/text/textOptions';
	let { textStyles } = $derived(ops);

	let showCode = $state(false);
	let isLoading = $state(true);

	$effect(() => {
		if (sessionData) {
			isLoading = false;
		}
	});
</script>

<svelte:head>
	<!-- Cal element-click embed code begins -->
	<script type="text/javascript">
		(function (C, A, L) {
			let p = function (a, ar) {
				a.q.push(ar);
			};
			let d = C.document;
			C.Cal =
				C.Cal ||
				function () {
					let cal = C.Cal;
					let ar = arguments;
					if (!cal.loaded) {
						cal.ns = {};
						cal.q = cal.q || [];
						d.head.appendChild(d.createElement('script')).src = A;
						cal.loaded = true;
					}
					if (ar[0] === L) {
						const api = function () {
							p(api, arguments);
						};
						const namespace = ar[1];
						api.q = api.q || [];
						if (typeof namespace === 'string') {
							cal.ns[namespace] = cal.ns[namespace] || api;
							p(cal.ns[namespace], ar);
							p(cal, ['initNamespace', namespace]);
						} else p(cal, ar);
						return;
					}
					p(cal, ar);
				};
		})(window, 'https://app.cal.com/embed/embed.js', 'init');
		Cal('init', 'coaching-session', { origin: 'https://cal.com' });

		// Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
		// `data-cal-link="mollymarsh/coaching-session"`
		// data-cal-namespace="coaching-session"
		// `data-cal-config='{"layout":"month_view","theme":"light"}'`

		Cal.ns['coaching-session']('ui', { theme: 'light', cssVarsPerTheme: { light: { 'cal-brand': '#3A6A5F' } }, hideEventTypeDetails: false, layout: 'month_view' });
	</script>
	<!-- Cal element-click embed code ends -->
</svelte:head>
<svelte:boundary>
	<div
		class="lm:px-6 lm:py-[6rem] bg-surface-primary-50 lm:bg-transparent flex
w-full justify-center"
	>
		{#if error}
			<div class="flex flex-col items-center gap-4">
				<p class="text-red-500">Error: {error}</p>
				<button
					class="font-special text-body-primary-800 bg-surface-primary-100 border-surface-primary-300 hover:bg-surface-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50 focus-within:bg-surface-primary-800 cursor-pointer rounded-md border p-3 text-lg font-medium uppercase transition-colors duration-300"
					onclick={() => window.location.reload()}
				>
					Retry
				</button>
			</div>
		{:else if isLoading}
			<div>No session data available</div>
		{:else}
			<section
				id="successful-purchase"
				aria-labelledby="successful-purchase_heading"
				class="lm:bg-surface-primary-50 lm:border-surface-primary-200 lm:border
					flex flex-col overflow-hidden rounded-xl md:max-w-180"
			>
				<div class="lm:gap-8 lm:p-8 flex w-full flex-col gap-4 p-4">
					<div class="lm:gap-5 flex w-full flex-row gap-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="fill-surface-primary-700 hidden
				 size-16 md:block"
						>
							<path
								fill-rule="evenodd"
								d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
								clip-rule="evenodd"
							/>
						</svg>

						<div class="flex w-full flex-col gap-0.5">
							<h2
								class="{textStyles.h7} text-heading-primary-800
					 w-full lg:text-[1.8rem]"
							>
								Thank you for your purchase
								{sessionData?.customer_name?.split(' ')[0]}!
							</h2>
							<p class="{textStyles.para6} w-full">Your order has been successfully processed.</p>
						</div>
					</div>
					<div class="flex w-full flex-col gap-0.5">
						<h2
							class="{textStyles.h6} text-heading-primary-800
			 w-full lg:text-[1.8rem]"
						>
							Next Step
						</h2>
						<p class="{textStyles.para6} w-full">Please book your coaching session by opening the calendar below.</p>
					</div>
					<button
						class="font-special text-body-primary-50 bg-surface-primary-900 hover:bg-surface-primary-700
					   focus-within:bg-surface-primary-700 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border
					   px-2 py-5 text-xl font-medium uppercase transition-colors duration-300"
						data-cal-link="mollymarsh/coaching-session?email={`${sessionData?.customer_email}`}&name={`${sessionData.customer_name}`}"
						data-cal-namespace="coaching-session"
						data-cal-config={JSON.stringify({ layout: 'month_view', theme: 'light' })}
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="fill-body-primary-50 size-6">
							<path
								fill-rule="evenodd"
								d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
								clip-rule="evenodd"
							/>
						</svg>
						<span> OPEN CALENDAR & BOOK YOUR SESSION </span>
					</button>
					<p class="{textStyles.paraBase} text-body-secondary-400 w-full">If you don’t want to book now, not to worry, you should have received an email with the calendar link.</p>
				</div>
				<div class="bg-surface-primary-300 h-[1px] w-full"></div>
				<div class="lm:gap-8 lm:p-8 flex w-full flex-col gap-4 p-4">
					<p class="{textStyles.paraBase} w-full">
						We have also sent an email to <b>{sessionData.customer_email}</b>
						with all of the information you will find on this page.
					</p>
					<article
						class="border-molly-200 lm:flex-row flex min-h-48 w-full flex-col
				 overflow-hidden rounded-lg border bg-white"
					>
						<img src={sessionData.item_image} alt="" role="presentation" class="lm:max-w-48 max-h-80 object-cover object-center" />
						<div class="lm:gap-8 flex w-full flex-col gap-5 p-5 pr-6">
							<div class="lm:gap-4 flex flex-col gap-6">
								<p class="!text-body-secondary-800 text-xl font-medium">{sessionData.item_description}</p>
								<div
									class="lm:flex-row lm:flex-wrap lm:gap-8 lm:*:flex-col
						 lm:*:gap-3 *: flex w-full flex-col gap-4
						 text-xl *:flex *:flex-row *:gap-2"
								>
									<div>
										<span
											class="!text-body-secondary-400
								 "
											>Date<span class="lm:hidden">:</span>
										</span>
										<span
											class="!text-body-secondary-700
								 
								 font-medium">{formatNoteDate(sessionData.invoice_date)}</span
										>
									</div>
									<div>
										<span class="!text-body-secondary-400">Invoice ID<span class="lm:hidden">:</span></span>
										<span
											class="!text-body-secondary-700
								 
								 font-medium">{sessionData.invoice_number}</span
										>
									</div>
									<div>
										<span
											class="!text-body-secondary-400
								 ">Amount Paid<span class="lm:hidden">:</span></span
										>
										<span
											class="!text-body-secondary-700
								 
								 font-medium">£{(sessionData.item_amount_total / 100).toFixed(2)}</span
										>
									</div>
								</div>
							</div>
							<a
								target="_blank"
								href={sessionData.receipt_url}
								aria-label="This link takes you to a stripe page
							where you can download your invoice and your receipt
							after having paid."
								class="font-special text-body-primary-800 bg-surface-primary-100 border-surface-primary-300 hover:bg-surface-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50
							 focus-within:bg-surface-primary-800 flex w-full cursor-pointer items-center
							 justify-center rounded-md border
								p-3 text-lg font-medium uppercase
								transition-colors duration-300"
							>
								Download Invoice
							</a>
						</div>
					</article>
				</div>
			</section>
		{/if}
	</div>

	{#snippet failed(err, reset)}
		<!-- <div class="flex w-full items-center justify-center pt-24">
			<button
				class="font-special text-body-primary-800 bg-surface-primary-100 border-surface-primary-300 hover:bg-surface-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50
		 focus-within:bg-surface-primary-800 w-full cursor-pointer rounded-md border
		 p-3 text-lg font-medium
		 uppercase transition-colors duration-300"
				onclick={reset}
			>
				Oops! Try again please.
			</button>
		</div> -->
		<div class="flex w-full items-center justify-center pt-24">
			<div class="flex flex-col items-center gap-4">
				<p class="text-red-500">Error: {err}</p>
				<button
					class="font-special text-body-primary-800 bg-surface-primary-100 border-surface-primary-300 hover:bg-surface-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50 focus-within:bg-surface-primary-800 w-full cursor-pointer rounded-md border p-3 text-lg font-medium uppercase transition-colors duration-300"
					onclick={() => window.location.reload()}
				>
					Retry
				</button>
			</div>
		</div>
	{/snippet}
</svelte:boundary>

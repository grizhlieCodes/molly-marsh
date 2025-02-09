<script lang="ts">
	let { data }: { data: any } = $props();
	let { sessionData, error }: { sessionData: any, error: string } = $derived(data);
	import { formatNoteDate } from '$lib/scripts/utils';

	import * as ops from '$lib/components/ui/text/textOptions';
	let { textStyles } = $derived(ops);

	let showCode = $state(false);
	let isLoading = $state(true);

	$effect(() => {
		if (sessionData) {
			isLoading = false;
		}
	});

	const downloadInvoice = async (invoiceId: string, invoiceNumber: string) => {
		try {
			const response = await fetch(`/api/stripe/download-invoice/${invoiceId}`, {
				method: 'GET',
				headers: {
					Accept: 'application/pdf'
				}
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to download invoice');
			}

			const contentType = response.headers.get('content-type');
			if (contentType && contentType.includes('application/pdf')) {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);

				const link = document.createElement('a');
				link.href = url;
				link.download = `invoice-${invoiceNumber}.pdf`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);

				window.URL.revokeObjectURL(url);
			} else {
				throw new Error('Invalid response format');
			}
		} catch (error) {
			console.error('Error downloading invoice:', error);
			alert('Failed to download invoice. Please try again later.');
		}
	};
</script>

<!-- <button class="fixed top-0 right-0 z-9999 bg-red-500 p-1" onclick={() => (showCode = !showCode)}>{showCode ? 'Close' : 'Open'}</button>
{#if showCode}
	<pre
		class="fixed top-0 right-0 z-999 w-full max-w-xl overflow-x-auto rounded-lg bg-gray-50 p-4
	 text-sm break-words whitespace-pre-wrap shadow">
		 {JSON.stringify(sessionData, null, 4)}
	 </pre>
{/if} -->

<svelte:head>
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
		Cal('init', 'discovery-call', { origin: 'https://cal.com' });

		// Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
		// `data-cal-link="rafalseer/discovery-call"`
		// data-cal-namespace="discovery-call"
		// `data-cal-config='{"layout":"month_view","theme":"light"}'`

		Cal.ns['discovery-call']('ui', { theme: 'light', cssVarsPerTheme: { light: { 'cal-brand': '#389344' }, dark: { 'cal-brand': '#389344' } }, hideEventTypeDetails: false, layout: 'month_view' });
	</script>
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
				onclick={() => window.location.reload()}>
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
								{sessionData.customerName.split(' ')[0]}!
							</h2>
							<p class="{textStyles.para6} w-full">Your order has been successfully processed.</p>
						</div>
					</div>
					<p class="{textStyles.paraBase} w-full">
						We have also sent an email to <b>{sessionData.customerEmail}</b>
						with all of the information you will find on this page.
					</p>
					<article
						class="border-molly-200 lm:flex-row flex min-h-48 w-full flex-col
				 overflow-hidden rounded-lg border bg-white"
					>
						<img src={sessionData.itemImage} alt="" role="presentation" class="lm:max-w-48 max-h-80 object-cover object-center" />
						<div class="lm:gap-8 flex w-full flex-col gap-5 p-5 pr-6">
							<div class="lm:gap-4 flex flex-col gap-6">
								<p class="!text-body-neutral-800 text-xl font-medium">{sessionData.itemDescription}</p>
								<div
									class="lm:flex-row lm:flex-wrap lm:gap-8 lm:*:flex-col
						 lm:*:gap-3 *: flex w-full flex-col gap-4
						 text-xl *:flex *:flex-row *:gap-2"
								>
									<div>
										<span
											class="!text-body-neutral-400
								 "
											>Date<span class="lm:hidden">:</span>
										</span>
										<span
											class="!text-body-neutral-700
								 
								 font-medium">{formatNoteDate(sessionData.invoiceDate)}</span
										>
									</div>
									<div>
										<span class="!text-body-neutral-400">Invoice ID<span class="lm:hidden">:</span></span>
										<span
											class="!text-body-neutral-700
								 
								 font-medium">{sessionData.invoiceNumber}</span
										>
									</div>
									<div>
										<span
											class="!text-body-neutral-400
								 ">Amount Paid<span class="lm:hidden">:</span></span
										>
										<span
											class="!text-body-neutral-700
								 
								 font-medium">£{(sessionData.itemAmount / 100).toFixed(2)}</span
										>
									</div>
								</div>
							</div>
							<button
								class="font-special text-body-primary-800 bg-surface-primary-100 border-surface-primary-300 hover:bg-surface-primary-800 hover:text-body-primary-50 focus-within:text-body-primary-50
							 focus-within:bg-surface-primary-800 w-full cursor-pointer rounded-md border
							 p-3 text-lg font-medium
							 uppercase transition-colors duration-300"
								onclick={() => downloadInvoice(sessionData.invoiceId, sessionData.invoiceNumber)}
							>
								Download Invoice
							</button>
						</div>
					</article>
				</div>
				<div class="bg-surface-primary-300 h-[1px] w-full"></div>
				<div class="lm:gap-8 lm:p-8 flex w-full flex-col gap-4 p-4">
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
						data-cal-link="rafalseer/discovery-call?email={`${sessionData.customerEmail}`}&name={`${sessionData.customerName}`}"
						data-cal-namespace="discovery-call"
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
					<p class="{textStyles.paraBase} text-body-neutral-400 w-full">If you don’t want to book now, not to worry, you should have received an email with the calendar link.</p>
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
				<p class="text-red-500">Error: {err.message}</p>
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

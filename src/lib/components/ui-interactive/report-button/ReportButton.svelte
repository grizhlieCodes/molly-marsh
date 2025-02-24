<script>
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';

	let formEl;
	let isCapturing = false;
	let reportData = {};

	async function captureScreenshot() {
		if (!browser) return null;
			try {
				const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
				const video = document.createElement('video');
				video.srcObject = stream;
				await video.play();

				const canvas = document.createElement('canvas');
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				const ctx = canvas.getContext('2d');
				ctx.drawImage(video, 0, 0);

				stream.getTracks().forEach((track) => track.stop());

				return canvas.toDataURL('image/jpeg', 0.8);
			} catch (error) {
				console.error('Failed to capture screenshot:', error);
				return null;
			}
	}

	async function gatherConsoleErrors() {
		if (!browser) return [];
		return window.__errorLog || [];
	}

	async function getBrowserInfo() {
		if (!browser) return { name: '', version: '', userAgent: '' };

		try {
			// Try using modern API first
			if (navigator.userAgentData) {
				const browserData = await navigator.userAgentData.getHighEntropyValues(['browserVersion']);
				return {
					name: navigator.userAgentData.brands[0].brand,
					version: browserData.browserVersion,
					userAgent: navigator.userAgent
				};
			}
		} catch (error) {
			console.error('Failed to get detailed browser info:', error);
		}

		// Fallback to userAgent parsing
		const userAgent = navigator.userAgent;
		let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		let name = match[1] || '';
		let version = match[2] || '';

		// Handle special cases
		if (/trident/i.test(name)) {
			match = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
			return { name: 'IE', version: match[1] || '', userAgent };
		}
		if (name === 'Chrome') {
			match = userAgent.match(/\bOPR|Edge\/(\d+)/);
			if (match != null) {
				name = match[0].indexOf('Edge') === 0 ? 'Edge' : 'Opera';
				version = match[1] || '';
			}
		}

		return { name, version, userAgent };
	}

	async function prepareReportData() {
		isCapturing = true;
		try {
			const screenshot = await captureScreenshot();
			const errors = await gatherConsoleErrors();
			const currentPath = browser ? window.location.href : '';
			const browserInfo = await getBrowserInfo();

			reportData = {
				screenshot,
				url: currentPath,
				errors,
				timestamp: new Date().toISOString(),
				browser: {
					name: browserInfo.name,
					version: browserInfo.version,
					userAgent: browserInfo.userAgent
				}
			};
			console.log('Report data prepared:', reportData);

			// Use a small timeout to ensure the binding has updated
			setTimeout(() => {
				isCapturing = false;
				if (formEl) {
					console.log('Submitting form');
					formEl.requestSubmit();
				} else {
					console.error('Form element not found');
				}
			}, 100);
		} catch (error) {
			console.error('Error preparing report data:', error);
			isCapturing = false;
		}
	}
</script>

<form
	class="fixed right-10 bottom-10 z-999"
	method="POST"
	action="?/sendErrorReport"
	bind:this={formEl}
	use:enhance={() => {
		console.log('Form enhanced, submission starting');
		return async ({ result }) => {
			console.log('Form submission result:', result);
			if (result.type === 'success') {
				alert('Bug report sent successfully!');
			} else {
				alert('Failed to send bug report. Please try again.');
			}
		};
	}}
>
	<input type="hidden" name="reportData" value={JSON.stringify(reportData)} />
	<button
		type="button"
		on:click={prepareReportData}
		disabled={isCapturing}
		class="group flex h-min
        cursor-pointer flex-row gap-2 rounded-lg bg-red-100 px-4 py-2
        text-red-700 transition-all duration-300 hover:bg-red-300 hover:text-red-900
        disabled:cursor-not-allowed disabled:opacity-50"
	>
		{isCapturing ? 'Capturing...' : 'Report'}
	</button>
</form>

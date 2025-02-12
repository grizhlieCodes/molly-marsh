<script lang="ts">
	interface ColorPicker {
		_uid: string;
		color: string;
		plugin: 'native-color-picker';
	}

	interface CalEmbed {
		_uid: string;
		cal_link: string;
		cal_view: 'month' | 'week' | 'day'; // Assuming these are the possible values
		cal_theme: 'light' | 'dark' | 'auto';
		component: 'cal_com_embed';
		cal_color_dark: ColorPicker;
		cal_color_light: ColorPicker;
		_editable: string;
	}
	import type { CalComEmbedStoryblok } from '$lib/schemas/storyblok/sbTypes';
	import { generateHtmlId } from '$lib/scripts/utils';
	import { onDestroy, onMount } from 'svelte';

	let { blok }: { blok: CalEmbed } = $props();

	let allDataLoaded = $state(false);

	let calId = generateHtmlId();
	let calLink = $state();
	let calEventName = $state();
	let calLightThemeHex = $state(blok?.cal_color_light?.color && blok?.cal_color_light?.color.length > 0 ? blok?.cal_color_light?.color : '#000000');
	let calDarkThemeHex = $state(blok?.cal_color_dark?.color && blok?.cal_color_dark?.color.length > 0 ? blok?.cal_color_dark?.color : '#FFFFFF');
	let calTheme = blok.cal_theme && blok.cal_theme.length > 0 ? blok.cal_theme : 'auto';
	let linkHandled = $state(false);
	let script = $state<HTMLScriptElement>();

	const handleLink = () => {
		const calFullLinkString = 'https://cal.com/';
		let isFullLink = blok.cal_link.includes(calFullLinkString);
		let newLink = isFullLink ? blok.cal_link.replace(calFullLinkString, '') : blok.cal_link;
		let eventName = [...newLink.split('/')][1];
		calLink = newLink;
		calEventName = eventName;
		console.log({ newLink, originalLink: blok.cal_link, eventName });

		// Fix link if it includes FULL link.
		// Add email if email present in localStorage
	};
	$inspect(blok);

	const createCalScript = () => {
		return `
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

        Cal('init', '${calEventName}', { origin: 'https://cal.com' });

        Cal.ns['${calEventName}']('inline', {
            elementOrSelector: '#${calId}',
            config: { layout: '${blok.cal_view}_view', theme: '${calTheme}' },
            calLink: '${calLink}'
        });

        Cal.ns['${calEventName}']('ui', { 
            ${calTheme === 'auto' ? '' : `theme: '${calTheme}',`}
            cssVarsPerTheme: { 
                light: { 'cal-brand': '${calLightThemeHex}' }, 
                dark: { 'cal-brand': '${calDarkThemeHex}' } 
            }, 
            hideEventTypeDetails: false, 
            layout: '${blok.cal_view}_view'
        });
	`;
	};

	onMount(() => {
		if (!linkHandled) {
			handleLink();
		}
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = createCalScript();
		document.head.appendChild(script);
	});

	onDestroy(() => {
		if (script) {
			document.head.removeChild(script);
		}
	});
</script>

<div class="flex flex-col gap-4">
	<p>{blok.cal_color_dark.color}</p>
	<p>{blok.cal_color_light.color}</p>
	<p>{blok.cal_link}, is full link: {blok.cal_link.includes('https://cal.com')}</p>
	<p>{blok.cal_theme}</p>
	<p>{blok.cal_view}</p>
</div>
<div style="width:100%;height:100%;overflow:scroll" id={calId}></div>

<script>
	import { page } from '$app/state';

	const pageTitle = `Molly Marsh - Transformative Life Coach`;
	const description = 'Transform your relationship with performance anxiety. Expert coaching for musicians looking to perform with confidence, freedom, and joy. Based in Sheffield, UK, offering online coaching worldwide.';

	const fullLink = $derived(`https://www.mollymarshcoaching.com${page.url.pathname}`);

	const openGraph = $derived([
		{
			property: 'og:type',
			content: 'website'
		},
		{
			property: 'og:title',
			content: pageTitle
		},
		{
			property: 'og:image',
			content: '/social-media-img.png'
		},
		{
			property: 'og:image:width',
			content: '1200'
		},
		{
			property: 'og:image:height',
			content: '630'
		},
		{
			property: 'og:description',
			content: description
		},
		{
			property: 'og:url',
			content: fullLink
		},
		{
			property: 'og:site_name',
			content: pageTitle
		}
	]);
</script>

<svelte:head>
	<!-- ROBOTS -->
	<meta name="googlebot" content="all" />
	<meta name="robots" content="all" />

	<!-- Icons -->
	<link rel="icon" href="/favicon.ico" sizes="any"/>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
	<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
	<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-precomposed.png"/>

	<!-- OTher -->
	<meta name="description" content={description} />
	<link rel="canonical" href={fullLink} />

	<!-- OPEN GRAPH -->
	{#each openGraph as { property, content }}
		<meta {property} {content} />
	{/each}
</svelte:head>

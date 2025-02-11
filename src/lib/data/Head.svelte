<script>
	const pageTitle = `Molly Marsh - Transformative Life Coach`;

	const description = 'Transform your relationship with performance anxiety. Expert coaching for musicians looking to perform with confidence, freedom, and joy. Based in Sheffield, UK, offering online coaching worldwide.';
	const fullLink = 'https://www.mollymarshcoaching.com';

	const openGraph = [
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
	];
</script>

<svelte:head>
	<!-- STANDARD -->

	<!-- ROBOTS -->
	<meta name="googlebot" content="all" />
	<meta name="robots" content="all" />

	<!-- CORE -->
	<!-- <link rel="icon" href={favicon} /> -->
	<meta name="description" content={description} />
	<link rel="canonical" href={fullLink} />

	<!-- OPEN GRAPH -->
	{#each openGraph as { property, content }}
		<meta {property} {content} />
	{/each}

	<!-- TWITTER - ADD IN FUTURE? -->
</svelte:head>

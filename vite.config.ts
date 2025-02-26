import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl'; // AND THIS (IF USING STORYBLOK)

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			sourceMapsUploadOptions: {
				org: 'seer-studio',
				project: 'javascript-sveltekit'
			}
		}),
		sveltekit(),
		tailwindcss(),
		basicSsl()
	],
	server: {
		https: true
	}
});

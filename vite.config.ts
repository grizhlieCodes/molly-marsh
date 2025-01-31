import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import basicSsl from '@vitejs/plugin-basic-ssl'; // AND THIS (IF USING STORYBLOK)

export default defineConfig({
	plugins: [sveltekit(), tailwindcss(), basicSsl()],
	server: {
		https: true,
		rejectUnauthorized: false
	}
});

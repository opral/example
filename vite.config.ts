import inlangPlugin from '@inlang/sdk-js/adapter-sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [inlangPlugin(), sveltekit()]
});

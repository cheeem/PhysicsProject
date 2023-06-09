import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'
//import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({ out: 'build' }),
	}
};

export default config;
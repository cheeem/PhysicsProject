import adapter from '@sveltejs/adapter-node';
//import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess'
//import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		adapter: adapter(/*{
			edge: false,
			split: false,
		}*/),
	}
};

export default config;

import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import configureServer from './socket'

const web_socket_server = {
	name: "sveltekit_socket_io",
	configureServer,
}

export default defineConfig({
	plugins: [sveltekit(), web_socket_server],
});

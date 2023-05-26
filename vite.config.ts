import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import socket_io from './socket.js'

const web_socket_server = {
	name: "sveltekit_socket_io",
	configureServer(server: any) {
		socket_io(server.httpServer)
	},
}

export default defineConfig({
	plugins: [sveltekit(), web_socket_server],
});

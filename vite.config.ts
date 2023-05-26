import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

import type { Game, Player } from "./types"

import { Server, Socket } from "socket.io"
import handle_socket from "./server/socket.js"

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" 

const webSocketServer = {
	name: "webSocketServer",
	configureServer(server: any) {
		handle_socket(server.httpServer)
	},
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
});
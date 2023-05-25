import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import type { Game, Player } from './types'

import { Server, Socket } from 'socket.io'

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const webSocketServer = {
	name: 'webSocketServer',
	configureServer,
}

function configureServer(server: any) {

	const games: Map<String, Game> = new Map<String, Game>()

    const io = new Server(server.httpServer)

	io.on('connection', (socket: Socket) => {
	
		socket.on('new_game', (player_id: string) => {

			const game_id = new_game_id(games, 5);
			const messages: string[] = []

			const game: Game = {
				id: game_id,
				messages,
				players: [{
					id: player_id,
				}],
			}

			games.set(game_id, game)

			io.emit("to_game", game, player_id)
			io.emit("receive", messages) 

		})

		socket.on('join', (game_id: string, player_id: string) => {

			const game: Game | undefined = games.get(game_id)

			if(!game) return

			io.emit("to_game", game, player_id) 

		})

		socket.on('send', (game_id: string, message: string) => {

			const messages = games.get(game_id)?.messages 

			if(!messages) return;

			messages.push(message)
		
			io.emit('receive', messages)

		})

	})

}

function new_game_id(games: Map<String, Game>, size: number) {

	let game_id: string = ""

	do {
		for(let i = 0; i < size; i++) {
			game_id += characters.charAt(
				Math.floor(
					Math.random() * characters.length
				)
			);
		}
	} while(games.has(game_id))

	return game_id

}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer],
});

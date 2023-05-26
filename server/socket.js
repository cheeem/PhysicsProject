import { Server, Socket } from "socket.io"

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function handle_socket(server) {

	const io = new Server(server);

	const games = new Map()

	io.on("connection", (socket) => {
	
		socket.on("new_game", (player_id) => {

			const game_id = new_game_id(games, 5);

			const game = {
				id: game_id,
				messages: [],
				players: [{
					id: player_id,
				}],
			}

			games.set(game_id, game)

			io.emit("to_game", game, player_id)

		})

		socket.on("join", (game_id, player_id) => {

			const game = games.get(game_id)

			if(!game) return

			io.emit("to_game", game, player_id) 

		})

		socket.on("send", (game_id, message) => {

			const messages = games.get(game_id)?.messages 

			if(!messages) return;

			messages.push(message)
		
			io.emit("receive", messages)

		})

	})

}

function new_game_id(games, size) {

	let game_id = ""

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

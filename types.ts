export type Player = {
    id: string,
    //messages_sent: string,
}

// export type GamePlayers = {
//     [key: string]: Player;
// }

export type Game = {
    id: string,
    messages: string[],
    players: Player[],
}
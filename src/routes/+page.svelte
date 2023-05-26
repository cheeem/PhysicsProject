<script lang="ts"> 

    import { io } from "socket.io-client"
    import { v4 as uuid } from "uuid"

    import type { Game, Player } from "../../types"
    
    const socket = io()
    const user_id = uuid()

    let game: Game

    socket.on("to_game", (new_game: Game, player_id: string) => {
        if(player_id !== user_id) return;
        game = new_game
    })

    socket.on("receive", (new_messages) => {
        game.messages = new_messages
    })

    function new_game() {
        socket.emit("new_game", user_id)
    }
    
</script>

<main>

    {#if game}

        <main> 
            <h1> {game.id} </h1>
            <input
                on:keydown={(event) => {
                
                    if(event.key !== "Enter") return 
                    if(!event.currentTarget.value) return
        
                    event.currentTarget.blur()
                    socket.emit("send", game.id, event.currentTarget.value)
        
                    event.currentTarget.value = ""
        
                }}
            />
            {#each game.messages as message}
                <p> {message} </p>
            {/each}
        </main>

    {:else}

        <button 
            on:click={new_game}
        > Create A New Chatroom </button>
        <input 
            on:keydown={(event) => {
                    
                if(event.key !== "Enter") return 
                if(!event.currentTarget.value) return

                event.currentTarget.blur()
                socket.emit("join", event.currentTarget.value, user_id)

                event.currentTarget.value = ""

            }}
        />

    {/if}

</main>

<style> 

</style>
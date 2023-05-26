import { createServer } from "http"
import { handler } from "../build/handler.js"
import handle_socket from "./socket.js"
import express from "express"

const port = 3000
const app = express()
const server = createServer(app)

handle_socket(server)

app.use(handler)

server.listen(port)
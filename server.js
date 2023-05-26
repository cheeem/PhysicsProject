import http from "http"
import { handler } from "./build/handler.js"
import socket_io from "./socket"
import express from "express"

const app = express()
const server = http.createServer(app)

socket_io(server)

app.use(handler)

server.listen(3000, () => {
    console.log("Running on http://localhost:3000")
})
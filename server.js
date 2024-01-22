const { Socket } = require('engine.io');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const port = 80;
const {Server} = require('socket.io');
const io = new Server(server)

app.use(express.static(__dirname + '/public/resources/'))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket)=>{
    console.log('Someon has connected to the server.')
    socket.on('on-chat', data =>{
        io.emit('user-chat', data)
    })
})

server.listen(port, ()=>{
    console.log(`SERVER: Server listened on port ${port}`)
})
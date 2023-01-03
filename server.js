const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app =express()
const server = http.createServer(app)
const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//run when client connects
io.on('connection',socket=>{
    
    // console.log('New WS Connection..')
   
    socket.emit('message','Welcome to FunSkoot!')

    //BroadCast when a user connects

    socket.broadcast.emit('message','A user has joined the chat')

    //runs when client disconnects

    socket.on('disconnect',()=>{
        io.emit('message','A user left the chat')
        // console.log("disconnected");
    })
})


const PORT = 3000 ||  process.env.PORT;
server.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
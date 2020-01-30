const express = require('express');
const app = express();

//save the instance of our server
const server = app.listen(7000, () => {
    console.log("port 7000 is running")
})

//pass the instance of our server to initialize a socket connection
const io = require('socket.io')(server);

//set event listeners and event emitters to help pass data between server and client
//one event listener named 'connection' is required before we create our own listeners
//each client that connects gets thier own socket

io.on('connection', socket => {
    // console.log(socket.id);
    console.log('a user connected');
    //whenever socket.id is logged in our terminal, this means a new client has successfully completed the handshake
    
    //all additional event listeners are added inside this function.
    //'connection' is a built in event listener

    socket.on('event_from_client', data => {
        // console.log(data)
        socket.broadcast.emit('send_data_to_other_client', data);

        //socket.on will listen for an event from the client. takes a callback function that contains data from the client. then we send the data straight to other clients
        //socket.broadcast emitts to all other clients besides the client that is doing the emitting
            //this function takes two parameters: event name and the data you want to send        
    });

    // socket.on('messages', (from, msg) => {
    //     console.log('received a message from: ', from, 'it says ', msg)
    // });

    socket.on('disconnect', () => {
        io.emit('user has disconnected');
        console.log('a user has disconnected')
    })
})



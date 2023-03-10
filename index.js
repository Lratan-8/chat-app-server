
require('dotenv').config()
//this is our node server which will handle socket io connections
const io = require('socket.io')(process.env.HOST, {
    cors: {
        origin: ['https://letuschatapplication.netlify.app/', 'http://127.0.0.1:5500'],
        credentials: true
    }
});

console.log("app is running");
console.log(`services started on host ${process.env.HOST}`);

const users = {};

//we are running a socket.io server which is an instance of HTTP
//the below code says that whenever we get a connection in the socket io, we should run the corresponding arrow function
//user-joined is a custom event made by us. 
//Now this 'io' will listen to the server will listen to the incoming events.

io.on('connection', socket => {

    console.log("Socket io is running");

    socket.on('new-user-joined', name => { //whenver we get a 'new-user-joined' event, then we hav to run this given arrow function
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
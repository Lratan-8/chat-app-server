//this is our node server which will handle socket io connections

const io = require('socket.io')(8000);

const users = {};

//we are running a socket.io server which is an instance of HTTP
io.on('connnection', socket => {
    socket.on('user-joined', name => {

    });
})
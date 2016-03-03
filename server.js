var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('User connected via socket.io');

    var now = moment();
    var timestampMoment = moment.utc(now.valueOf());

    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);

        // sends to all, excluding sender
        // socket.broadcast.emit('message', message);

        // send to all, including sender
        io.emit('message', message);
    });

    socket.emit('message', {
        text: 'Welcome to the chat application!',
        timestamp: timestampMoment.local().format('h:mm a')
    });
});

http.listen(PORT, function () {
    console.log('Server started');
});
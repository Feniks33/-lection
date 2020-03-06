var http = require('http');
var fs = require('fs');

// Chargement index.html
var server = http.createServer(function (req, res) {
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
    });
});
// Chargement index.html


// Socket.io
var io = require('socket.io').listen(server);

var nbvote0 = 0
var nb1ervote = 0

io.sockets.on('connexion', function (socket) {
    socket.broadcast.emit('vote0', nbvote0);
    socket.emit('vote0', nbvote0);
    socket.broadcast.emit('1ervote', nb1ervote);
    socket.emit('1ervote', nb1ervote);


    socket.on('plus1', function (idClique) {
        if (idClique == 0) {
            nbvote0++
            socket.broadcast.emit('vote0', nbvote0);
            socket.emit('vote0', nbvote0);
        }
        else if (idClique == 1) {
            nb1ervote++
            socket.broadcast.emit('1ervote', nb1ervote);
            socket.emit('1ervote', nb1ervote);
        }
    });

    socket.on('moins1', function (idClique) {
        if (idClique == 0) {
            nbvote0--
            socket.broadcast.emit('vote0', nbvote0);
            socket.emit('vote0', nbvote0);
        }
        else if (idClique == 1) {
            nb1ervote--
            socket.broadcast.emit('1ervote', nb1ervote);
            socket.emit('1ervote', nb1ervote);
        }
    })
});

server.listen(3000);
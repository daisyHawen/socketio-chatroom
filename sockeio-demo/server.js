var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
app.get('', function(req, rse) {
    res.sendfile(__dirname + '/index.html'); /* body... */
})
var connetionList = {};
io.on('connection', function(socket) {
    //服务端向客户端发送消息
    socket.emit('test', { hello: 'test' });
    socket.on('my other event', function(data) {
        console.log(data);
    })
})


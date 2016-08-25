var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(80);
app.get('', function(req, rse) {
    res.sendfile(__dirname + '/index.html'); /* body... */
})
var connetionList = {};
io.on('connection', function(socket) {
    console.log(socket);
    //收到用户加入聊天室，发起广播用户加入
    socket.on('join', function(data) {
        /* body... */
        socket.broadcast.emit('broadcast_join', data);
        connectionList[socketId].username = data.username;
    });
    //用户离开聊天室，发起广播用户退出
    socket.on('disconnect', function() {
        // body...  
        if (connectionList[socketId].username) {
            socket.broadcast.emit('broadcast_quit', {
                username: connectionList[socketId].username
            });
        }
        delete connectionList[socketId];
    });
    //收到用户发言事件，发起广播发言
    socket.on('say', function(data) {
        socket.broadcast.emit('braocast_say', {
            username: connectionList[socketId].username,
            text: data.text
        });
    });
    //服务端向客户端发送消息
    socket.emit('test', { hello: 'test' });
    socket.on('my other event', function(data) {
        console.log(data);
    })
})

var connetionList = {};
exports.statChat = function(io) {
    //客户端连接，保存socketid和用户名
    var socketId = socket.id;
    // console.log(socket);
    connectionList[socketId] = {
            socket: socket
        }
        //用户加入聊天室
    socket.on('join', function(data) {
        /* body... */
        socket.broadcast.emit('broadcast_join', data);
        connectionList[socketId].username = data.username;
    });
    //用户离开聊天室
    socket.on('disconnect', function() {
        // body...  
        if (connectionList[socketId].username) {
            socket.broadcast.emit('broadcast_quit', {
                username: connectionList[socketId].username
            });
        }
        delete connectionList[socketId];
    });
    //用户发言事件
    socket.on('say', function(data) {
        socket.broadcast.emit('braocast_say', {
            username: connectionList[socketId].username,
            text: data.text
        });
    });
}
http.listen(3000, function(){
	console.log('listening on *:3000');
});
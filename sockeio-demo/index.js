/*Using with Express 3.3.12*/
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var connectionList = {}
    // server.listen(3000);
app.get('', function(req, rse) {
    res.sendfile(__dirname + '/index.html'); /* body... */
})
io.on('connection', function(socket) {
    // socket.emit('news',{hello:'world'});
    // socket.on('my other event',function(data) {
    // 	 console.log(data);
    // })
    console.log(socket.id);
    var socketId = socket.id;
    connectionList[socketId] = {
        socket: socket
    }
    console.log('a user connected');
    //收到用户加入聊天室，发起广播用户加入
    socket.on('join', function(data) {
        /* body... */

        console.log('join');
        console.log(data);
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
    	console.log('接收say事件');
    	console.log(data);
        socket.broadcast.emit('broadcast_say', {
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
server.listen(3000, function() {
    console.log('listening on *:3000');
});

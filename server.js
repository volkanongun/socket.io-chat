
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

app.use(express.static(__dirname + '/frontend'));
app.use('/three',express.static(__dirname + '/node_modules/three/build/'));
app.use('/io',express.static(__dirname + '/node_modules/socket.io-client/dist/'));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

server.listen(4000,() => console.log('Server running on port 4000'));
// import cv from 'opencv4nodejs';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

const FPS = 10;

app.use(express.static(__dirname + '/frontend'));
app.use('/io',express.static(__dirname + '/node_modules/socket.io-client/dist/'));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('join', name => {
    console.log(`${name} joined!`);
    socket.name = name;
    io.emit('join', name);
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});


server.listen(4000,() => console.log('Server running on port 4000'));
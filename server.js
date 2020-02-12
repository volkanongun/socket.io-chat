// import cv from 'opencv4nodejs';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = new SocketIO(server);

const FPS = 10;
// const wCap = new cv.VideoCapture(0);
// wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
// wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);

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

// setInterval(() => {
//   const frame = wCap.read();
//   const image = cv.imencode('.jpg', frame).toString('base64');
//   io.emit('image', image)
// }, 1000 / FPS)

server.listen(4000,() => console.log('Server running on port 4000'));
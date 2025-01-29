const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('paste', (data) => {
    io.emit('newPaste', data); // Broadcast the new paste to all clients
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

import express from 'express';
import { Server as WebSocketServer, Socket } from 'socket.io';
import { Ping, Pong } from '@andrei-zhaleznichenka/cpu-monitor-agent-api';

const port = process.env.PORT || 3001;

const app = express();

const server = require('http').Server(app);

const wss = new WebSocketServer(server);

wss.on('connection', (socket: Socket) => {
  console.log('Connected!');

  socket.on('Ping', (data: Ping) => {
    console.log('Received ping:', data.value);

    setTimeout(() => {
      socket.emit('Pong', new Pong(data.value));
      console.log('Responded with pong:', data.value);
    }, 1000);
  });
});

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}.`);
});

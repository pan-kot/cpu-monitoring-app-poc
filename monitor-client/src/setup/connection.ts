import io from 'socket.io-client';
import { Ping, Pong } from '@andrei-zhaleznichenka/cpu-monitor-agent-api';

const socket = io('/');

(() => {
  let counter = 0;

  socket.on('Pong', (data: Pong) => {
    console.log('Received pong:', data.value);

    socket.emit('Ping', new Ping(counter++));
    console.log('Sent ping:', counter);
  });

  socket.emit('Ping', new Ping(counter));
  console.log('Sent ping:', counter);
})();

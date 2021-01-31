/* tslint:disable:no-console */

import io from 'socket.io-client';
import { Connected, Tick } from '@andrei-zhaleznichenka/cpu-monitor-agent-api';

const socket = io('/');

(() => {
  socket.emit('Connect', {});

  socket.on('Connected', (data: Connected) => {
    console.log('Connected', data);
  });

  socket.on('Tick', (data: Tick) => {
    console.log('Tick', data);
  });
})();

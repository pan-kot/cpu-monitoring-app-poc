import ioclient, { Socket } from 'socket.io-client';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

import { Connected, Events, History, Settings, Tick } from '../domain';

class MonitorStore {
  settings: null | Settings = null;
  current: number = 0;
  values: number[] = [0];
  events: Events = {};

  socket: typeof Socket;

  constructor() {
    makeAutoObservable(this, {
      socket: false,
      connect: false,
      disconnect: false
    });

    this.socket = ioclient('/', { autoConnect: false });
  }

  init = (settings: Settings, history: History) => {
    this.settings = settings;

    this.values = Array(settings.maxTicks);

    let tick = 0;

    while (tick < history.values.length) {
      this.values[tick] = history.values[tick];

      tick += 1;
    }

    this.current = tick < settings.maxTicks ? tick : 0;

    this.events = history.events;
  };

  tick = ({ value, event }: Tick) => {
    if (!this.settings) {
      throw new Error('Invariant violation: cannot tick when settings unset.');
    }

    this.values[this.current] = value;

    delete this.events[this.current];

    if (event) {
      this.events[this.current] = event;
    }

    this.current =
      this.current + 1 < this.settings.maxTicks ? this.current + 1 : 0;
  };

  connect = () => {
    this.socket.connect();

    this.socket.emit('Connect', {});

    this.socket.on('Connected', ({ settings, history }: Connected) => {
      this.init(settings, history);
    });

    this.socket.on('Tick', (tick: Tick) => {
      this.tick(tick);
    });
  };

  disconnect = () => {
    this.socket.disconnect();
  };
}

export default createContext(new MonitorStore());

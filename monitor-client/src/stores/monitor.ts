import { Socket } from 'socket.io-client';
import { makeAutoObservable } from 'mobx';
import { createContext } from 'react';

import {
  Connected,
  Events,
  History,
  Settings,
  Tick,
  TimeValue
} from '../domain';

import i18n from '../i18n';
import PushNotifications from '../util/push-notifications';
import initSocket from '../api/init-socket';

// Used to render the chart when the connection is not yet established.
const defaultSettings = {
  tickInterval: 10,
  maxTicks: 60,
  highLoadThreshold: { value: 1, ticks: 12 },
  recoveryThreshold: { value: 1, ticks: 12 }
};

export class MonitorStore {
  settings: Settings = defaultSettings;

  // Array of average CPU loads taken for each tick interval.
  values: (null | number)[] = [];
  // Current value index never exceeding values length.
  current: number = -1;
  // Maximum value of all ticks (not contained to a frame size).
  maximum: number = 0;
  // Events per tick within frame size.
  events: Events = {};

  socket: typeof Socket;
  connected: boolean;
  notifications: PushNotifications;

  constructor() {
    makeAutoObservable(this, {
      socket: false,
      notifications: false
    });

    this.socket = initSocket();
    this.connected = false;
    this.notifications = new PushNotifications();
  }

  // Accept settings and historical data from the server and calculate maximum.
  init = (settings: Settings, history: History) => {
    this.settings = settings;

    this.values = history.values;
    this.events = history.events;

    this.current = history.values.length - 1;

    for (const value of this.values) {
      if (value !== null) {
        this.maximum = Math.max(this.maximum, value);
      }
    }
  };

  // Accept last tick data from the server and update maximum if needed.
  // Spawn push notification for every new event.
  tick = ({ value, event }: Tick) => {
    if (!this.settings) {
      throw new Error('Invariant violation: cannot tick when settings unset.');
    }

    this.current = this.current + 1 < this.values.length ? this.current + 1 : 0;

    this.values[this.current] = value;

    delete this.events[this.current];
    if (event) {
      this.events[this.current] = event;

      this.notifications.push(i18n.event(event), i18n.eventDescription(event));
    }

    this.maximum = Math.max(this.maximum, value);
  };

  setConnected = () => {
    this.connected = true;
  };

  setDisconnected = () => {
    this.connected = false;
  };

  // Creates a normalized list of time-values from right to left.
  get timeseries(): TimeValue[] {
    const series = Array(this.values.length);

    let tick = this.current;

    for (let offset = 0; offset < this.values.length; offset += 1) {
      const value = this.values[tick];
      const event = this.events[tick] || null;

      if (value !== undefined && value !== null) {
        series[offset] = { offset, value, event };
      }

      tick = tick - 1 >= 0 ? tick - 1 : this.values.length - 1;
    }

    return series;
  }

  connect = () => {
    this.socket.connect();

    // Requesting server settings and historical data every time socket
    // is connected to handle server downtimes properly.
    this.socket.on('connect', () => {
      this.socket.emit('Connect', {});
    });

    this.socket.on('Connected', ({ settings, history }: Connected) => {
      this.init(settings, history);
    });

    this.socket.on('Tick', (tick: Tick) => {
      this.tick(tick);
    });

    // Handling connection status.
    this.socket.on('connect', this.setConnected);
    this.socket.on('connect_error', this.setDisconnected);
    this.socket.on('disconnect', this.setDisconnected);
  };

  disconnect = () => {
    this.socket.disconnect();
  };
}

export default createContext(new MonitorStore());

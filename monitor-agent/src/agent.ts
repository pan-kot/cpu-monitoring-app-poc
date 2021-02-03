/* tslint:disable:no-console */

import express from 'express';
import { createServer, Server as HttpServer } from 'http';
import { Server as WebSocketServer, Socket } from 'socket.io';

import { Env, Settings, Connected, Tick } from './types';

import Monitor from './monitor/monitor';

export default class MonitorAgent {
  private port: number;
  private settings: Settings;

  private app: express.Application;
  private server: HttpServer;
  private wss: WebSocketServer;
  private monitor: Monitor;

  constructor({ port, cors, settings }: Env) {
    this.port = port;
    this.settings = settings;

    this.app = express();
    this.server = createServer(this.app);
    this.wss = new WebSocketServer(this.server, { cors });
    this.monitor = new Monitor(settings);
  }

  run() {
    this.server.listen(this.port, () => {
      console.log(`Listening on http://localhost:${this.port}.`);
    });

    this.wss.on('connection', (socket: Socket) => {
      console.log('Client connected.');

      socket.on('Connect', () => {
        const message: Connected = {
          settings: this.settings,
          history: this.monitor.history
        };

        socket.emit('Connected', message);

        this.monitor.subscribe((tick: Tick) => {
          socket.emit('Tick', tick);
        });
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected.');
      });
    });
  }
}

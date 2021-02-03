import ioclient from 'socket.io-client';

import env from '../env';

export default function initSocket() {
  return ioclient(env.apiBase, { autoConnect: false });
}

import * as env from './env';

import MonitorAgent from './agent';

const agent = new MonitorAgent(env.port, env.settings);

agent.run();

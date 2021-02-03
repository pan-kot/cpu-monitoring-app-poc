import env from './env';
import MonitorAgent from './agent';

const agent = new MonitorAgent(env);

agent.run();

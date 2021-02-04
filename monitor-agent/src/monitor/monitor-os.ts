import os from 'os';

// Helper for accessing OS data.
export default class MonitorOS {
  private numCpus: number;

  constructor() {
    this.numCpus = os.cpus().length;
  }

  // ! On Windows machines os.loadavg() always returns [0, 0, 0].
  get averageCpuLoad() {
    return round(os.loadavg()[0] / this.numCpus);
  }
}

// See https://stackoverflow.com/a/11832950/4450193
function round(input: number, precision: number = 2) {
  const base = 10 ** precision;

  return Math.round((input + Number.EPSILON) * base) / base;
}

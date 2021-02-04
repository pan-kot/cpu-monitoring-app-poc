import { EventType } from './domain';

const i18n = {
  title: {
    label: 'CPU Monitor'
  },
  chart: {
    loadAxis: {
      label: 'Avgerage Load'
    },
    tooltip: {
      offset: 'Offset',
      load: 'Load',
      event: 'Event',
      empty: 'No data.'
    }
  },
  offline: 'disconnected',
  event(type: EventType) {
    switch (type) {
      case EventType.HIGH_LOAD:
        return 'High Load';
      case EventType.RECOVERY:
        return 'Recovery';
      default:
        return '???';
    }
  },
  eventDescription(type: EventType) {
    switch (type) {
      case EventType.HIGH_LOAD:
        return 'CPU is under high load.';
      case EventType.RECOVERY:
        return 'CPU recovered from high load.';
      default:
        return '???';
    }
  },
  duration: formatDuration
};

function formatDuration(durationSeconds: number): string {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;

  if (!seconds) {
    return `${minutes}m`;
  }

  if (!minutes) {
    return `${seconds}s`;
  }

  return `${minutes}m ${seconds}s`;
}

export default i18n;

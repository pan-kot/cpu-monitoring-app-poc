import { EventType } from './domain';

const i18n = {
  title: {
    label: 'CPU Monitor'
  },
  chart: {
    loadAxis: {
      label: 'Avgerage Load'
    }
  },
  tooltip: {
    offset: 'Offset',
    load: 'Load',
    event: 'Event',
    empty: 'No data.'
  },
  event(type: EventType) {
    return type === EventType.HIGH_LOAD ? 'High Load' : 'Recovery';
  }
};

export default i18n;

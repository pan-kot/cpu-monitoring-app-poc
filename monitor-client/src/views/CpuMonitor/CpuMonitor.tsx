import { useContext, useEffect } from 'react';
import { Observer } from 'mobx-react-lite';

import MonitorStore from '../../stores/MonitorStore';

import Layout from './components/Layout';
import StatusBar from './components/StatusBar';
import AverageLoadChart from './components/AverageLoadChart';
import AlertsBar from './components/AlertsBar';

function CpuMonitorView() {
  const store = useContext(MonitorStore);

  useEffect(() => {
    store.connect();

    return () => {
      store.disconnect();
    };
  }, [store]);

  return (
    <Observer>
      {() => {
        return (
          <Layout>
            {/* TODO: fix current ref */}
            <StatusBar current={store.values[store.current - 1]} />

            <AverageLoadChart />

            <AlertsBar />
          </Layout>
        );
      }}
    </Observer>
  );
}

export default CpuMonitorView;

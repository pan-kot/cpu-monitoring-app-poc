import { useContext, useEffect } from 'react';
import { Observer } from 'mobx-react-lite';

import Setup from './setup';
import MonitorStore from './stores/monitor';
import { Layout, Title, Chart } from './components';

export default function App() {
  const store = useContext(MonitorStore);

  useEffect(() => {
    store.connect();

    return () => {
      store.disconnect();
    };
  }, [store]);

  return (
    <Setup>
      <Observer>
        {() => {
          const {
            connected,
            settings,
            values,
            current,
            maximum,
            timeseries
          } = store;

          return (
            <Layout>
              <Title current={connected ? values[current] : 0} />

              <Chart
                connected={connected}
                settings={settings}
                timeseries={timeseries}
                maximum={maximum}
              />
            </Layout>
          );
        }}
      </Observer>
    </Setup>
  );
}

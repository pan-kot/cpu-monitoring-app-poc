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
        {() => (
          <Layout>
            <Title current={store.values[store.current]} />

            <Chart
              settings={store.settings}
              timeseries={store.timeseries}
              maximum={store.maximum}
            />
          </Layout>
        )}
      </Observer>
    </Setup>
  );
}

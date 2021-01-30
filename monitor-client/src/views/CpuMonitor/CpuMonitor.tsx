import Layout from './components/Layout';
import StatusBar from './components/StatusBar';
import AverageLoadChart from './components/AverageLoadChart';
import AlertsBar from './components/AlertsBar';

export default function CpuMonitorView() {
  return (
    <Layout>
      <StatusBar />

      <AverageLoadChart />

      <AlertsBar />
    </Layout>
  );
}

// This interval ensures there is no accumulated discrepancy.
export default function setStableInterval(
  callback: () => void,
  intervalSeconds: number
) {
  const intervalMs = intervalSeconds * 1000;

  let counter = 0;
  let offset = 0;
  let currentTime = Date.now();
  const initialTime = currentTime;

  function run() {
    setTimeout(() => {
      counter += 1;

      currentTime = Date.now();
      offset = currentTime - initialTime - counter * intervalMs;

      setImmediate(callback);

      run();
    }, intervalMs - offset);
  }

  run();
}

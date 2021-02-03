import { render } from 'react-dom';

import App from './App';

render(<App />, document.getElementById('root'));

// https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API
if ('Notification' in window) {
  Notification.requestPermission();
}

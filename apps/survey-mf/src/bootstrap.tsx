import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
// import './main.css';

import App from './app/app';

ReactDOM.render(
  <StrictMode>
    <App />
    {/* <KeycloakLogin />, */}
  </StrictMode>,
  document.getElementById('root')
);

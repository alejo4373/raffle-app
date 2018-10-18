import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
const browserHistory = createBrowserHistory();

ReactDOM.render(
  <Router history={browserHistory}>
    <App history={browserHistory} />
  </Router>, document.getElementById('root'));

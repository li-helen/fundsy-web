import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import { ThemeProvider } from 'react-css-themr';
// establishes socket connection
import './socket'

const contextTheme = {
  RTButton: require('./styles/button.css'),
  RTTable: require('./styles/table.css')
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={contextTheme}>
    <Router history={history}>
      <App />
    </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('app')
)

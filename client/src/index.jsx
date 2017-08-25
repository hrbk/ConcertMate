import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers';
import store from './redux/store';
import App from './App.jsx';

ReactDOM.render(<Provider store={store}>
                  <App />
                </Provider>, document.getElementById('app'));


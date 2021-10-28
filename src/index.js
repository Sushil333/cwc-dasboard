import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import 'simplebar/src/simplebar.css';

import { reducers } from './reducers';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';

// ----------------------------------------------------------------------

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

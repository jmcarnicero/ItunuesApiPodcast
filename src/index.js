import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import reducers from './data/reducers';
import App from './scenes/App';
import List from './scenes/App/List';
import Detail from './scenes/App/Detail';
import Track from './scenes/App/Track';

import registerServiceWorker from './registerServiceWorker';

import './styles/App.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <div className="container">
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={List} />
          <Route path="/podcast/:podcastId" component={Detail} />
          <Route path="/podcast/:podcastId/episode/:episodeId" component={Track} />
        </Route>
      </Router>
    </Provider>,
  </div>,
  document.getElementById('root'),
);
registerServiceWorker();

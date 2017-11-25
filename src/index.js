import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from './components/App';
import PodcastList from './components/Podcast_List/podcats_list';
import PodcastDetail from './components/Podcast_Detail/podcast_detail';
import PodcastChapter from './components/Podcast_Chapter/podcast_chapter';

import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

import './styles/App.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PodcastList} />
        <Route path="/podcast/:podcastId" component={PodcastDetail} />
        <Route path="/podcast/:podcastId/episode/:episodeId" component={PodcastChapter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

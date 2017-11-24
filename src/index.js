import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, hashHistory } from 'react-router';

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
      {
        // <Route path="/" component={App} />
      }
      <Route path="/" component={PodcastList} />
      <Route path="/podcast/:podcastId" component={PodcastDetail} />
      <Route path="/podcast/:podcastId/episode/:episodeId" component={PodcastChapter} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

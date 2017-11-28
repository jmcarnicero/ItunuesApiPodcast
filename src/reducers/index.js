import { combineReducers } from 'redux';
import podcastsReducer from './podcasts';
import podcastDetailReducer from './podcast_detail';
import podcastSelectedReducer from './podcast_selected';
import tracksReducer from './tracks';
import loadingReducer from './loading';
import errorReducer from './errors';

const rootReducer = combineReducers({
  podcasts: podcastsReducer,
  podcastDetail: podcastDetailReducer,
  podcastSelected: podcastSelectedReducer,
  tracks: tracksReducer,
  loading: loadingReducer,
  error: errorReducer,
});

export default rootReducer;

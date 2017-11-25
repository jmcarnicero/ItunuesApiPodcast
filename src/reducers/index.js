import { combineReducers } from 'redux';
import podcastsReducer from './podcasts';
import podcastDetailReducer from './podcast_detail';
import podcastSelectedReducer from './podcast_selected';
import tracksReducer from './tracks';

const rootReducer = combineReducers({
  podcasts: podcastsReducer,
  podcastDetail: podcastDetailReducer,
  podcastSelected: podcastSelectedReducer,
  tracks: tracksReducer,
});

export default rootReducer;

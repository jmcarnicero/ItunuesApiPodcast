import { combineReducers } from 'redux';
import podcastsReducer from './podcasts';
import podcastDetailReducer from './podcast_detail';
import podcastSelectedReducer from './podcast_selected';

const rootReducer = combineReducers({
  podcasts: podcastsReducer,
  podcastDetail: podcastDetailReducer,
  podcastSelected: podcastSelectedReducer,
});

export default rootReducer;

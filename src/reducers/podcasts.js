import { FETCH_PODCAST } from '../actions/types';

function podcastsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PODCAST: {
      return [...state, ...action.payload.data.feed.entry];
    }

    default:
      return state;
  }
}

export default podcastsReducer;

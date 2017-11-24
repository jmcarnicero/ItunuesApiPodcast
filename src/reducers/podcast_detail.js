import { FETCH_PODCAST_DETAIL } from '../actions/types';

function podcastDetailReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PODCAST_DETAIL: {
      // return [...state, action.payload.data.results];
      return Object.assign({}, state, action.payload.data.results);
    }

    default:
      return state;
  }
}

export default podcastDetailReducer;

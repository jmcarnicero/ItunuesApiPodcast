import { FETCH_PODCAST_DETAIL } from '../actions/types';

function podcastDetailReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_PODCAST_DETAIL: {
      return Object.assign({}, state, action.payload.data.results[0]);
    }

    default:
      return state;
  }
}

export default podcastDetailReducer;

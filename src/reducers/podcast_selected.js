import { SET_PODCAST_SELECTED } from '../actions/types';

function podcastSelectedReducer(state = [], action) {
  switch (action.type) {
    case SET_PODCAST_SELECTED: {
      return Object.assign({}, state, action.payload);
    }

    default:
      return state;
  }
}

export default podcastSelectedReducer;

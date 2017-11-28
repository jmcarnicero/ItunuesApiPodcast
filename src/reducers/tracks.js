import { SET_TRACKS, CLEAN_TRACKS } from '../actions/types';

function tracksReducer(state = [], action) {
  switch (action.type) {
    case SET_TRACKS: {
      return [...state, ...action.payload];
    }
    case CLEAN_TRACKS: {
      return [];
    }

    default:
      return state;
  }
}

export default tracksReducer;

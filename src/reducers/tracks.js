import { SET_TRACKS } from '../actions/types';

function tracksReducer(state = [], action) {
  switch (action.type) {
    case SET_TRACKS: {
      return [...state, ...action.payload];
    }

    default:
      return state;
  }
}

export default tracksReducer;

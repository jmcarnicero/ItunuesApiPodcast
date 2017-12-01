import { IS_LOADING } from '../actions/types';

function podcastDetailReducer(state = false, action) {
  switch (action.type) {
    case IS_LOADING: {
      return action.payload;
    }

    default:
      return state;
  }
}

export default podcastDetailReducer;

import { SET_ERROR } from '../actions/types';

function errorsReducer(state = '', action) {
  switch (action.type) {
    case SET_ERROR: {
      return action.payload;
    }

    default:
      return state;
  }
}

export default errorsReducer;

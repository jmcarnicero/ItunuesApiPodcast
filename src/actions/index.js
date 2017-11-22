import axios from 'axios';
import { FETCH_PODCAST } from './types';

export function fetchPodcasts(url) {
  return (dispatch) => {
    axios.get(url).then((response) => {
      dispatch({
        type: FETCH_PODCAST,
        payload: response,
      });
    });
  };
}

// avoid export default linter rule
export function tmp() {
  return true;
}

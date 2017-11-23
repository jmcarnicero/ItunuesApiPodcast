import axios from 'axios';
import { FETCH_PODCAST } from './types';

export function fetchPodcasts() {
  return (dispatch) => {
    const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
    axios.get(url).then((response) => {
      dispatch({
        type: FETCH_PODCAST,
        payload: response,
      });
    });
  };
}

// avoid linter rule . prefer export default
export function tmp() {
  return true;
}

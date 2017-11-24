import axios from 'axios';
import { FETCH_PODCAST, FETCH_PODCAST_DETAIL, SET_PODCAST_SELECTED } from './types';

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

const findPodcast = (id, podcasts) =>
  podcasts.filter(podcast => podcast.id.attributes['im:id'] === id);

export function setPodcastSelected(id) {
  return (dispatch, getState) => {
    const podcastSelected = findPodcast(id, getState().podcasts);
    dispatch({
      type: SET_PODCAST_SELECTED,
      payload: podcastSelected[0],
    });
  };
}

export function fetchPodcastDetail(id) {
  return (dispatch) => {
    const url = `https://itunes.apple.com/lookup?id=${id}`;
    axios.get(url).then((response) => {
      dispatch({
        type: FETCH_PODCAST_DETAIL,
        payload: response,
      });
    });
  };
}

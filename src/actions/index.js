import axios from 'axios';
import { parseString } from 'xml2js';
import {
  FETCH_PODCAST,
  FETCH_PODCAST_DETAIL,
  SET_PODCAST_SELECTED,
  SET_TRACKS,
  IS_LOADING,
} from './types';

export function isLoading(loading) {
  return {
    type: IS_LOADING,
    payload: loading,
  };
}

export function fetchPodcasts() {
  return (dispatch) => {
    const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
    dispatch(isLoading(true));
    axios.get(url).then((response) => {
      dispatch(isLoading(false));
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
    dispatch(isLoading, true);
    const url = `https://itunes.apple.com/lookup?id=${id}`;
    axios
      .get(url)
      .then((response) => {
        dispatch(isLoading(false));
        dispatch({
          type: FETCH_PODCAST_DETAIL,
          payload: response,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
}

const parseXml = (xml) => {
  let result = [];
  parseString(xml, (err, data) => {
    result = data.rss.channel[0].item;
  });

  return result;
};

export function fetchFeeds(url) {
  return (dispatch) => {
    dispatch(isLoading(true));
    const completeUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    axios
      .get(completeUrl)
      .then(response => response.data)
      .then((data) => {
        dispatch(isLoading(false));
        dispatch({
          type: SET_TRACKS,
          payload: parseXml(data),
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
}

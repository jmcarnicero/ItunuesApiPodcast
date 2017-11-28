import axios from 'axios';
import { parseString } from 'xml2js';
import {
  FETCH_PODCAST,
  FETCH_PODCAST_DETAIL,
  SET_PODCAST_SELECTED,
  SET_TRACKS,
  CLEAN_TRACKS,
  IS_LOADING,
  SET_ERROR,
} from './types';

export function isLoading(loading) {
  return {
    type: IS_LOADING,
    payload: loading,
  };
}

function cachedUrl(url, dispatch) {
  const expiry = 60 * 60 * 25; // 1day   default

  dispatch(isLoading(true));

  // if (typeof options === 'number') {
  //   expiry = options;
  //   options = undefined;
  // } else if (typeof options === 'object') {
  //   expiry = options.seconds || expiry;
  // }

  const cacheKey = url;
  const cached = localStorage.getItem(cacheKey);
  const whenCached = localStorage.getItem(`${cacheKey}:ts`);

  if (cached !== null && whenCached !== null) {
    const age = (Date.now() - whenCached) / 1000;
    if (age < expiry) {
      dispatch(isLoading(false));
      return Promise.resolve(JSON.parse(cached));
    }

    localStorage.removeItem(cacheKey);
    localStorage.removeItem(`${cacheKey}:ts`);
  }

  return axios
    .get(url)
    .then((response) => {
      if (response.status === 200) {
        dispatch(isLoading(false));
        const ct = response.headers['content-type'];
        if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
          const responseStringify = JSON.stringify(Object.assign({}, response));

          localStorage.setItem(cacheKey, responseStringify);
          localStorage.setItem(`${cacheKey}:ts`, Date.now());
        }
      }
      dispatch(isLoading(false));
      return response;
    })
    .catch(error => error);
}

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error,
  };
}

const parseXml = (dipstach, xml) => {
  let result = [];
  parseString(xml, (err, data) => {
    if (err) {
      console.log('err', err, dipstach);
      dipstach(setError, err);
      return [];
    }
    result = data.rss.channel[0].item;
    return result;
  });
  return result;
};

export function cleanTraks() {
  return {
    type: CLEAN_TRACKS,
    payload: [],
  };
}

export function fetchFeeds(url) {
  return (dispatch) => {
    const completeUrl = `https://cors-anywhere.herokuapp.com/${url}`;
    cachedUrl(completeUrl, dispatch).then((response) => {
      const dataParse = parseXml(dispatch, response.data);
      dispatch({
        type: SET_TRACKS,
        payload: dataParse,
      });
    });
  };
}

export function fetchPodcasts() {
  return (dispatch) => {
    // dispatch(isLoading(true));
    const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

    cachedUrl(url, dispatch).then((response) => {
      const podcast = response;
      // dispatch(isLoading(false));
      dispatch({
        type: FETCH_PODCAST,
        payload: podcast,
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
    dispatch(setPodcastSelected(id));
    dispatch(cleanTraks());
    const url = `https://itunes.apple.com/lookup?id=${id}`;
    cachedUrl(url, dispatch).then((response) => {
      dispatch({
        type: FETCH_PODCAST_DETAIL,
        payload: response,
      });
      dispatch(fetchFeeds(response.data.results[0].feedUrl));
    });
  };
}

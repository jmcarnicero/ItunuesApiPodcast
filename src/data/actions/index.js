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

export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error,
  };
}

function cachedUrl(url, dispatch) {
  const expiry = 60 * 60 * 25; // 1day   default

  dispatch(setError(''));
  dispatch(isLoading(true));

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

        if (ct !== 'text/html; charset=UTF-8') {
          const responseStringify = JSON.stringify(Object.assign({}, response));
          localStorage.setItem(cacheKey, responseStringify);
          localStorage.setItem(`${cacheKey}:ts`, Date.now());
        } else {
          dispatch(setError('No es un json valido'));
          return Promise.reject();
        }
      }
      return response;
    })
    .catch((error) => {
      dispatch(isLoading(false));
      dispatch(setError(error));
      return error;
    });
}

const parseXml = (dipstach, xml) => {
  let result = [];

  parseString(xml, (err, data) => {
    if (err) {
      dipstach(setError('Xml no valido'));
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
    cachedUrl(completeUrl, dispatch)
      .then((response) => {
        const dataParse = parseXml(dispatch, response.data);
        dispatch({
          type: SET_TRACKS,
          payload: dataParse,
        });
      })
      .catch(() => {
        dispatch(setError('Feed novalido'));
      });
  };
}

export function fetchPodcasts() {
  return (dispatch) => {
    const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

    cachedUrl(url, dispatch).then((response) => {
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
    dispatch(setPodcastSelected(id));
    dispatch(cleanTraks());
    const url = `https://itunes.apple.com/lookup?id=${id}`;
    cachedUrl(url, dispatch).then((response) => {
      dispatch({
        type: FETCH_PODCAST_DETAIL,
        payload: response,
      });
      const feedUrl = response.data.results[0].feedUrl; // eslint-disable-line prefer-destructuring
      dispatch(fetchFeeds(feedUrl));
    });
  };
}

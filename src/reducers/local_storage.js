import { FETCH_PODCAST } from '../actions/types';

const persistData = store => next => (action) => {
  console.log('store , action', store, action);

  switch (action.type) {
    case FETCH_PODCAST: {
      // localStorage.setItem('podcasts', JSON.stringify(action.payload.data.feed.entry));

      let podcasts = localStorage.getItem('podcasts');

      if (podcasts && typeof JSON.parse(podcasts) === 'object') {
        podcasts = JSON.parse(podcasts);
        // action.payload.data.feed.entry = podcasts.data;
        // action.payload.data.feed.entry = [];
        console.log('podcasts ', podcasts.timeStamp);
        return true;
      }
      console.log('VACIO ');
      localStorage.setItem(
        'podcasts',
        JSON.stringify({
          timeStamp: Date.now(),
          data: JSON.stringify(action.payload.data.feed.entry),
        }),
      );

      return next(action);

      // const entry = [];
      // action.payload.data.feed.entry = entry;

      // return [...state, ...action.payload.data.feed.entry];
    }

    default:
      return next(action);
  }
};

export default persistData;

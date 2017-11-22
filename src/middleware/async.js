export default function ({ dispatch }) {
  return next => (action) => {
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    return action.payload.then((response) => {
      // action.payload = response;
      const newActions = { ...action, payload: response };
      dispatch(newActions);
    });
  };
}

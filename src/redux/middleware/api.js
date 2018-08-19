import * as TYPES from 'redux/types';

export default ({dispatch, getState}) => next => async action => {
  if (action.type !== TYPES.APIREQUEST) {
    return next(action);
  }
  const {method, endpoint, onsuccess, onerror} = action.payload;
  try {
    const config = {
      method,
    };
    const response = await (await fetch(endpoint, config)).json();
    dispatch(onsuccess(response));
  } catch (err) {
    dispatch(onerror(err));
  }
};

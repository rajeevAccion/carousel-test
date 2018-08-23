import * as TYPES from 'redux/types';

/**
 * Redux middleware - initiate network call and dispatches success action.
 * api url, http method, success/error action passed as api payload.
 */
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

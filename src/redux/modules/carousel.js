import * as TYPES from 'redux/types';

const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case TYPES.REQUEST_IMAGE:
      return {
        request: true,
        error: false,
      };
    case TYPES.RECEIVE_IMAGE:
      return {
        ...state,
        data: action.payload.hits,
        request: false,
        error: false,
      };
    case TYPES.REQUEST_IMAGE_ERROR:
      return {
        ...state,
        request: false,
        error: true,
      };
    default:
      return state;
  }
};

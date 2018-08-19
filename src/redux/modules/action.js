import * as TYPES from 'redux/types';
import {PIXBAY} from 'modules/config';

const receiveImage = json => ({
  type: TYPES.RECEIVE_IMAGE,
  payload: json,
});
const requestImageError = err => ({
  type: TYPES.REQUEST_IMAGE_ERROR,
  err,
});

export const fetchImages = () => ({
  type: TYPES.APIREQUEST,
  payload: {
    endpoint: `${PIXBAY}`,
    method: 'GET',
    onsuccess: receiveImage,
    onerror: requestImageError,
  },
});

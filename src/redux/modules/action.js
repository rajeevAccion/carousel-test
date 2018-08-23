import * as TYPES from 'redux/types';
import {PIXBAY} from 'modules/config';

// middleware dispatches `receiveImage` action creator  with image payload
const receiveImage = json => ({
  type: TYPES.RECEIVE_IMAGE,
  payload: json,
});

// middleware dispatches `requestImageError` action creator if any network issues
const requestImageError = err => ({
  type: TYPES.REQUEST_IMAGE_ERROR,
  err,
});

// redux async action creator to fetch images
export const fetchImages = () => ({
  type: TYPES.APIREQUEST,
  payload: {
    endpoint: `${PIXBAY}`,
    method: 'GET',
    onsuccess: receiveImage,
    onerror: requestImageError,
  },
});

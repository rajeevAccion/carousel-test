import * as TYPES from 'redux/types';
import carouselReducer from './carousel';

describe('carouselreducer', () => {
  test('returns default initial state,  when no action is passed', () => {
    const newState = carouselReducer(undefined, {});
    expect(newState).toEqual({});
  });
  test('returns state of true upon receiving an action of type `RECEIVE_IMAGE`', () => {
    const payload = {
      hits: [{userImageURL: 'someurl', user: 'somename'}],
    };
    const newState = carouselReducer(undefined, {
      type: TYPES.RECEIVE_IMAGE,
      payload,
    });
    expect(newState).toEqual({
      data: payload.hits,
      request: false,
      error: false,
    });
  });
});

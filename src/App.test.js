import React from 'react';
import {shallow} from 'enzyme';

import {storeFactory} from '../src/test/testUtils';
import ConnectedApp, {App} from './App';

/**
 * @function setup
 * @param {object} state - State for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive();
  return wrapper;
};

test('`fetchImages` runs on App mount', () => {
  const fetchImagesMock = jest.fn();

  const props = {
    fetchImages: fetchImagesMock,
    images: [{userImageURL: 'someurl', user: 'somename'}],
  };

  // set up app component with fetchImagesMock as the fetchImages prop
  const wrapper = shallow(<App {...props} />);

  // run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if mock ran
  const fetchImagesCallCount = fetchImagesMock.mock.calls.length;

  expect(fetchImagesCallCount).toBe(1);
});

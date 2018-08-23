import React from 'react';
import {shallow} from 'enzyme';

import Carousel from './Carousel';
import {findByTestAttr, checkProps} from '../../test/testUtils';

const defaultProps = [{userImageURL: 'someurl', user: 'somename', id: 1}];

const setUp = (props = {}) => {
  return shallow(<Carousel items={defaultProps} {...props} />);
};

describe('Carousel', () => {
  test('renders without errors', () => {
    const wrapper = setUp();
    const coponent = findByTestAttr(wrapper, 'carousel-container');
    expect(coponent.length).toBe(1);
  });

  test('does not throw warning with expected props', () => {
    checkProps(Carousel, {items: defaultProps});
  });
});

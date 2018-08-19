import {combineReducers} from 'redux';

import {carouselReducer} from 'redux/modules';

export default combineReducers({
  carousel: carouselReducer,
});

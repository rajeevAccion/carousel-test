import React from 'react';
import {render} from 'react-dom';

import configureStore from 'redux/cofigureStore';
import Root from 'Root';
import 'normalize.css';
import './index.css';

const store = configureStore(window.__INITIAL_STATE__);

const target = document.querySelector('#root');
render(<Root store={store} />, target);

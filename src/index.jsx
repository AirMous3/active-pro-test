import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/app';
import { Main } from '@/pages';
import { GlobalStyle } from '@/shared';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <Main />
      <GlobalStyle />
    </Provider>
  </>,
);

import React from 'react';

import {
  Provider
} from 'react-redux';

import {
  Navigation
} from 'app/components/navigation/navigation';

import {
  store
} from 'app/redux/store/index';

import {
  GlobalStyle
} from 'app/styles/globalStyle';

export function App() {

  return (
    <Provider store={store}>
      <React.Fragment>
        <GlobalStyle />
        <Navigation />
      </React.Fragment>
    </Provider>
  );

}

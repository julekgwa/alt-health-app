import React from 'react';

import './App.css';

import {
  Provider
} from 'react-redux';

import {
  Navigation
} from './components/navigation/navigation';

import {
  store
} from './redux/store';

import {
  GlobalStyle
} from './styles/globalStyle';

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

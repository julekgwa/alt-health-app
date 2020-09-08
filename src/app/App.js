import React from 'react';

import './App.css';

import {
  Navigation
} from './components/navigation/navigation';

import {
  GlobalStyle
} from './styles/globalStyle';

export function App() {

  return (
    <React.Fragment>
      <GlobalStyle />
      <Navigation />
    </React.Fragment>
  );

}

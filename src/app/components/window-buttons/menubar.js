import {
  faTimes,
  faWindowMaximize,
  faWindowMinimize
} from '@fortawesome/free-solid-svg-icons';

import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

import React from 'react';

import {
  MenuBarContainer
} from './menubar-container';

export function MenuBar() {

  const onMax = () => {

    window.ipcRenderer.send('window:max');

  };

  const onMin = () => {

    window.ipcRenderer.send('window:min');

  };

  const onClose = () => {

    window.ipcRenderer.send('window:close');

  };

  return (
    <MenuBarContainer>
      <FontAwesomeIcon
        style={{
          marginTop: '-9px',
          paddingRight: '10px',
          '-webkit-app-region': 'no-drag',
        }}
        size='1x'
        icon={faWindowMinimize}
        onClick={onMin}
      />
      <FontAwesomeIcon
        onClick={onMax}
        style={{
          paddingRight: '10px',
          '-webkit-app-region': 'no-drag',
        }}
        size='1x'
        icon={faWindowMaximize}
      />
      <FontAwesomeIcon style={{
        '-webkit-app-region': 'no-drag',
      }} onClick={onClose} size='1x' icon={faTimes} />
    </MenuBarContainer>
  );

}

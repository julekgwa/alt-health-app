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
        data-testid='min'
        style={{
          marginTop: '-9px',
          paddingRight: '10px',
          WebkitAppRegion: 'no-drag',
        }}
        size='1x'
        icon={faWindowMinimize}
        onClick={onMin}
      />
      <FontAwesomeIcon
        data-testid='max'
        onClick={onMax}
        style={{
          paddingRight: '10px',
          WebkitAppRegion: 'no-drag',
        }}
        size='1x'
        icon={faWindowMaximize}
      />
      <FontAwesomeIcon data-testid='close' style={{
        WebkitAppRegion: 'no-drag',
      }} onClick={onClose} size='1x' icon={faTimes} />
    </MenuBarContainer>
  );

}

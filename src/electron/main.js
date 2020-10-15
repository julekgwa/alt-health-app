const electron = require('electron');

const { app, ipcMain, } = electron;
const BrowserWindow = electron.BrowserWindow;
const isDev = require('electron-is-dev');

const path = require('path');

let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 720,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
    },
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../../build/index.html')}`
  );

  mainWindow.on('closed', () => (mainWindow = null));

}
app.on('ready', createWindow);
app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {

    app.quit();

  }

});
app.on('activate', () => {

  if (mainWindow === null) {

    createWindow();

  }

});

ipcMain.on('window:close', () => {

  app.quit();

});

ipcMain.on('window:max', () => {

  if (!mainWindow.isMaximized()) {

    mainWindow.maximize();

  } else {

    mainWindow.unmaximize();

  }

});

ipcMain.on('window:min', () => {

  mainWindow.minimize();

});

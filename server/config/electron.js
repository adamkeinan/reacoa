const is = require('electron-is');

const config = {
  width: 1280,
  height: 720,
  resizable: true,
  enableDevTools: true,
  singleInstance: true,
  server: false,
  tray: false,
  menu: false,
  website: 'https://github.com/yuri2peter/reacoa',
  about: 'Powered by Reacoa.\nhttps://github.com/yuri2peter/reacoa',
  win: {
    tray: true,
    menu: true,
  },
  linux: {
    tray: false, // Strongly recommended to set it to FALSE.
    menu: true,
  },
  mac: {
    tray: false,
    menu: false,
  },
};

if (is.windows()) { Object.assign(config, config.win) }
if (is.linux()) { Object.assign(config, config.linux) }
if (is.macOS()) { Object.assign(config, config.mac) }

module.exports = config;

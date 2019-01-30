const { app, Menu, BrowserWindow, globalShortcut } = require('electron');
const server = require('./app');
const config = {
  width: 1200,
  height: 900,
  openDevTools: true,
  home: '',
};

(async () => {
  let mainWindow;
  const { home, blank, port } = await server(3001);
  app.on('ready', function createWindow () {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({ width: config.width, height: config.height });
    mainWindow.on('closed', function () {
      mainWindow = null
    });
    const loadHome = () => { mainWindow.loadURL(config.home || home); };
    const loadBlank = () => { mainWindow.loadURL(blank); };
    loadBlank();
    mainWindow.webContents.executeJavaScript(
      `localStorage.setItem('reacoa', '${JSON.stringify({
        port,
        home,
        electron: true,
      })}')`,
      true, loadHome
    );

    globalShortcut.register('CommandOrControl+F12', () => {
      if (config.openDevTools) {
        mainWindow.webContents.openDevTools();
      }
    });
  });
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });
})();

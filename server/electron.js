const { app, Menu, BrowserWindow, globalShortcut } = require('electron');
const config = require('./config/electron');
const server = require('./app');
let mainWindow; // Keep a global reference of the window object
(async () => {
  const { home, blank, port, appId } = await server(3001);
  app.on('ready', function createWindow () {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
      width: config.width,
      height: config.height,
      resizable: config.resizable,
    });
    mainWindow.on('closed', function () {
      mainWindow = null
    });
    const registerKeys = () => {
      const bindKeys = () => {
        if (config.enableDevTools) {
          globalShortcut.register('CommandOrControl+F12', () => {
            if (config.enableDevTools) {
              mainWindow.webContents.openDevTools();
            }
          });
        }
        globalShortcut.register('F5', () => {
          mainWindow.reload();
        });
      };
      const unbindKeys = () => {
        globalShortcut.unregister('CommandOrControl+F12');
        globalShortcut.unregister('F5');

      };
      mainWindow.on('blur', unbindKeys);
      mainWindow.on('focus', bindKeys);
    };
    const initPage = () => {
      const loadHome = () => { mainWindow.loadURL(config.home || home); };
      const loadBlank = () => { mainWindow.loadURL(blank); };
      loadBlank();
      mainWindow.webContents.executeJavaScript(
        `localStorage.setItem('reacoa', '${JSON.stringify({
          port,
          home,
          appId,
          electron: true,
        })}')`,
        true, loadHome
      );
    };
    const singleCheck = () => {
      if (config.singleInstance) {
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
          app.quit()
        } else {
          app.on('second-instance', (event, commandLine, workingDirectory) => {
            // Someone tried to run a second instance, we should focus our window.
            if (mainWindow) {
              if (mainWindow.isMinimized()) mainWindow.restore();
              mainWindow.focus()
            }
          });
        }
      }
    };
    singleCheck();
    initPage();
    registerKeys();
  });
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      if (mainWindow) {
        mainWindow.webContents.closeDevTools()
      }
      app.quit()
    }
  });
})();

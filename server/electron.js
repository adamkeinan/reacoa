// eslint-disable-next-line
const { app, Menu, BrowserWindow, globalShortcut, Tray, dialog, shell } = require('electron');
const path = require('path');
const config = require('./config/electron');
const server = require('./app');

let mainWindow; // Keep a global reference of the window object
(async () => {
  let tray;
  let showHiddenTips = true;
  let closing = false;

  app.on('ready', function createWindow() {
    Menu.setApplicationMenu(null);
    mainWindow = new BrowserWindow({
      width: config.width,
      height: config.height,
      resizable: config.resizable,
    });
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
    const closeApp = () => {
      closing = true;
      app.quit();
    };
    const menuItems = {
      separator: { type: 'separator' },
      show: {
        label: 'Show', type: 'normal',
        click: () => {
          mainWindow.show();
        },
      },
      about: {
        label: 'About', type: 'normal',
        click: () => {
          dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'About',
            message: config.about,
          });
        },
      },
      website: {
        label: 'Website', type: 'normal',
        click: () => {
          shell.openExternal(config.website);
        },
      },
      exit: {
        label: 'Exit',
        type: 'normal',
        accelerator: 'CommandOrControl+Q',
        click: closeApp,
      },
    };
    const registerKeys = () => {
      const bindKeys = () => {
        if (config.enableDevTools) {
          globalShortcut.register('CommandOrControl+Shift+I', () => {
            if (config.enableDevTools) {
              mainWindow.webContents.openDevTools();
            }
          });
        }
        globalShortcut.register('CommandOrControl+R', () => {
          mainWindow.reload();
        });
        globalShortcut.register('CommandOrControl+Q', closeApp);
      };
      const unbindKeys = () => {
        globalShortcut.unregister('CommandOrControl+Shift+I');
        globalShortcut.unregister('CommandOrControl+R');
        globalShortcut.unregister('CommandOrControl+Q');
      };
      mainWindow.on('blur', unbindKeys);
      mainWindow.on('focus', bindKeys);
    };
    const initPage = async () => {
      if (config.home) {
        mainWindow.loadURL(config.home);
      } else {
        const { home, blank, port, seed } = await server(3001);
        const loadHome = () => { mainWindow.loadURL(home); };
        const loadBlank = () => { mainWindow.loadURL(blank); };
        loadBlank();
        mainWindow.webContents.executeJavaScript(
          `localStorage.setItem('reacoa', '${JSON.stringify({
            port,
            home,
            seed,
            electron: true,
          })}')`,
          false, loadHome
        );
      }
    };
    const singleCheck = () => {
      if (config.singleInstance) {
        const gotTheLock = app.requestSingleInstanceLock();
        if (!gotTheLock) {
          app.quit();
        } else {
          app.on('second-instance', () => {
            // Someone tried to run a second instance,
            // we should focus our window.
            if (mainWindow) {
              if (mainWindow.isMinimized()) mainWindow.restore();
              mainWindow.focus();
            }
          });
        }
      }
    };
    const setTray = () => {
      if (config.tray) {
        try {
          tray = new Tray(path.join(__dirname, './front/favicon.ico'));
        } catch (e) {
          tray = new Tray(path.join(__dirname, './front/favicon.png'));
        }
        const contextMenu = Menu.buildFromTemplate([
          menuItems.show,
          menuItems.separator,
          menuItems.website,
          menuItems.about,
          menuItems.separator,
          menuItems.exit,
        ]);
        tray.on('double-click', () => {
          mainWindow.show();
        });
        tray.setToolTip(app.getName());
        tray.setContextMenu(contextMenu);

        mainWindow.on('close', (event) => {
          mainWindow.hide();
          mainWindow.setSkipTaskbar(true);
          if (showHiddenTips) {
            tray.displayBalloon({
              title: app.getName(),
              content: 'Running in tray mode.',
            });
            showHiddenTips = false;
          }
          if (!closing) {
            event.preventDefault();
          }
        });
        mainWindow.on('show', () => {
          mainWindow.setSkipTaskbar(false);
          tray.setHighlightMode('always');
        });
        mainWindow.on('hide', () => {
          tray.setHighlightMode('never');
        });
      }
    };
    const setMenu = () => {
      if (config.menu) {
        Menu.setApplicationMenu(Menu.buildFromTemplate([
          {
            label: 'Edit',
            submenu: [
              { role: 'undo' },
              { role: 'redo' },
              { type: 'separator' },
              { role: 'cut' },
              { role: 'copy' },
              { role: 'paste' },
              { role: 'pasteandmatchstyle' },
              { role: 'delete' },
              { role: 'selectall' },
            ],
          },
          {
            label: 'View',
            submenu: [
              { role: 'reload' },
              { role: 'forcereload' },
              ...(config.enableDevTools ? [{ role: 'toggledevtools' }] : []),
              { type: 'separator' },
              { role: 'resetzoom' },
              { role: 'zoomin' },
              { role: 'zoomout' },
              { type: 'separator' },
              { role: 'togglefullscreen' },
            ],
          },
          {
            role: 'window',
            submenu: [
              { role: 'minimize' },
              { role: 'close' },
              menuItems.exit,
            ],
          },
          {
            role: 'help',
            submenu: [
              menuItems.website,
              menuItems.about,
            ],
          },
        ]));
      }
    };
    singleCheck();
    initPage();
    registerKeys();
    setTray();
    setMenu();
  });
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      if (mainWindow) {
        mainWindow.webContents.closeDevTools();
      }
      app.quit();
    }
  });
})();

const {
    app,
    BrowserWindow,
    Menu,
    globalShortcut
} = require('electron');
const path = require("path");
const menu = require('./menu/index');
const template = require('./menu/template');
const fileHandler = require('./fileHandler');
const {
    autoUpdater
} = require('electron-updater');

const indexPath = path.resolve(__dirname, '..', 'renderer', 'index.html');
const preloadPath = path.resolve(__dirname, '..', 'preload', 'index.js');
let window;

app.on('ready', () => {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            preload: preloadPath,
        },
    });
    window.loadFile(indexPath);

    globalShortcut.register('CommandOrControl+S', () => {
        fileHandler.saveFile();
    });

    globalShortcut.register('CommandOrControl+O', () => {
        fileHandler.loadFile();
    });

    if (process.platform === 'win32') {
        app.setAppUserModelId(app.name);
    }
    autoUpdater.checkForUpdatesAndNotify();
});

Menu.setApplicationMenu(template);
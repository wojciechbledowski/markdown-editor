const {
    app,
    Menu,
    shell,
    BrowserWindow
} = require('electron');
const fileHandler = require('../fileHandler');

const template = [{
        label: 'File',
        submenu: [{
                label: 'Open',
                accelerator: 'CommandOrControl+O',
                click() {
                    fileHandler.loadFile();
                }
            },
            {
                label: 'Save',
                accelerator: 'CommandOrControl+S',
                click() {
                    fileHandler.saveFile();
                }
            }
        ]
    },
    {
        label: 'Format',
        submenu: [{
                label: 'Toggle Bold',
                accelerator: 'CommandOrControl+B',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send(
                        'editor-event',
                        'toggle-bold'
                    );
                }
            },
            {
                label: 'Toggle Italic',
                accelerator: 'CommandOrControl+I',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send(
                        'editor-event',
                        'toggle-italic'
                    );
                }
            },
            {
                label: 'Toggle Strikethrough',
                accelerator: 'CommandOrControl+T',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send(
                        'editor-event',
                        'toggle-strikethrough'
                    );
                }
            }
        ]
    },
    {
        role: 'help',
        submenu: [{
            label: 'About Editor Component',
            click() {
                shell.openExternal('https://simplemde.com/');
            }
        }]
    }
];

if (process.platform === 'win32') {
    const appName = app.getName();
    template.unshift({
        label: appName.charAt(0).toUpperCase() + appName.slice(1),
        submenu: [{
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            }
        ]
    })
}

if (process.env.DEBUG) {
    template.push({
        label: 'Debugging',
        submenu: [{
                label: 'Dev Tools',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                role: 'reload',
                accelerator: 'Alt+R'
            }
        ]
    });
}

const menu = Menu.buildFromTemplate(template);
module.exports = menu;
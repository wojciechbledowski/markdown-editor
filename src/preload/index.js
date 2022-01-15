const {
    contextBridge,
    ipcRenderer
} = require('electron');

const validChannels = [
    'editor-reply',
    'editor-event',
    'save',
    'load'
];

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (_event, ...args) => func(...args));
            }
        }
    }
);
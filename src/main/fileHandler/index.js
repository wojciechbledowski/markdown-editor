const {
    BrowserWindow,
    dialog
} = require('electron');
const fs = require('fs');

exports.saveFile = () => {
    const window = BrowserWindow.getFocusedWindow();
    window.webContents.send('editor-event', 'save');
}

exports.loadFile = async () => {
    const window = BrowserWindow.getFocusedWindow();
    const options = {
        title: 'Pick a markdown file',
        filters: [{
                name: 'Markdown files',
                extensions: ['md']
            },
            {
                name: 'Text files',
                extensions: ['txt']
            }
        ]
    };
    const result = await dialog.showOpenDialog(window, options);
    if (result.filePaths && result.filePaths.length !== 0) {
        const content = fs.readFileSync(result.filePaths[0]).toString();
        window.webContents.send('load', content);
    }
}
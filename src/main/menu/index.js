const {
    ipcMain,
    BrowserWindow,
    dialog,
    Notification
} = require('electron');
const fs = require('fs');


ipcMain.on('editor-reply', (_event, arg) => {
    const notification = new Notification({
        title: 'Received reply from web page',
        body: `Message: ${arg}.`
    });

    notification.show();
});

ipcMain.on('save', async (_event, arg) => {
    const window = BrowserWindow.getFocusedWindow();
    const options = {
        title: 'Save markdown file',
        filters: [{
            name: 'Markdown files',
            extensions: ['md']
        }]
    };

    const result = await dialog.showSaveDialog(window, options);
    if (result?.filePath && result.filePath.length !== 0) {
        const filePath = result.filePath;
        fs.writeFileSync(filePath, arg);
    }
});
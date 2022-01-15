import {editor} from './editor.js';

function dropHandler(event) {
    event.preventDefault();
    if (event.dataTransfer.items) {
        if (event.dataTransfer.items[0].kind === 'file') {
            const file = event.dataTransfer.items[0].getAsFile();
            const reader = new FileReader();
            reader.onload = (e) => {
                editor.codemirror.setValue(e.target.result);
            };
            reader.readAsText(file);
        }
    }
}

document.body.addEventListener('drop', dropHandler, false);
export const editor = new SimpleMDE({
    element: document.getElementById('editor'),
    shortcuts: {
		'toggleBold': null,
		'toggleItalic': null,
	},
});

window.api.receive('editor-event', (arg) => {
    window.api.send('editor-reply', `received ${arg}`);
    switch (arg) {
        case 'toggle-bold':
            editor.toggleBold();
            break;
        case 'toggle-italic':
            editor.toggleItalic();
            break;
        case 'toggle-strikethrough':
            editor.toggleStrikethrough();
            break;
        case 'save':
            window.api.send('save', editor.value());
            break;
        default:
            throw 'Unknown editor argument.';
    }
});

window.api.receive('load', (content) => {
    if (content) {
        window.api.send('editor-reply', `received load`);
        editor.value(content);
    }
});
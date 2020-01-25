import AjaxForm from '../includes/ajax_form';
import Events from '../includes/events';

const app = {
    events: new Events(),
};
app.events.on('ready', () => {
    AjaxForm.init();
});

document.addEventListener('DOMContentLoaded', () => {
    app.events.emit('ready');
});

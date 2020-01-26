import AjaxForm from '../includes/ajax_form';
import Events from '../includes/events';
import StatisticChart from '../includes/statistic_chart';

const app = {
    events: new Events(),
};

global.Events = Events;
global.app = app;

app.events.on('ready', () => {
    AjaxForm.init();
    StatisticChart.init();
});

document.addEventListener('DOMContentLoaded', () => {
    app.events.emit('ready');
});

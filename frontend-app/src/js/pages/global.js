import Events from '../includes/events';
import StatisticChart from '../includes/statistic_chart';

const app = {
    events: new Events(),
};

global.Events = Events;
global.app = app;

app.events.on('ready', () => {
    StatisticChart.init();
});

document.addEventListener('DOMContentLoaded', () => {
    app.events.emit('ready');
});

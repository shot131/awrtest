import templateString from 'es6-template-strings';
import URI from 'urijs';

const DataLoader = (function() {
    let data = [];
    return {
        getData() {
            return data;
        },
        loadData() {

        },
        randomData() {
            let data = [];
            const startDate = Filter.getParam('stat-start');
            const start = startDate ? new Date(startDate) : new Date(2019, 0, 1);
            const endDate = Filter.getParam('stat-end');
            const end = endDate ? new Date(endDate) : new Date(2019, 0, 2);
            const min = 1;
            const max = 100000;
            while (start < end) {
                start.setTime(start.getTime() + 5000 * 60);
                data.push({
                    time: Math.round(start.getTime() / 1000),
                    value: Math.floor(Math.random() * (max - min + 1)) + min,
                });
            }
            return data;
        },
    }
})();

const Filter = (function() {
    let form;
    let fields;
    let params = {};
    let delayTimer;

    return {
        setParam(name, value) {
            if (!value) {
                delete params[name];
            } else {
                params[name] = value;
            }
        },
        getParam(name) {
            return params[name];
        },
        syncWithUrl() {
            const url = URI();
            params = url.search(true);
            for (const paramName in params) {
                if (!params.hasOwnProperty(paramName)) {
                    continue;
                }
                const field = form.querySelector(`[name="${paramName}"]`);
                if (field) {
                    field.value = params[paramName];
                }
            }
        },
        getUrl() {
            const url = URI();
            url.search(params);
            return url;
        },
        init(root) {
            form = root;

            this.syncWithUrl();
            const onChangeField = (event) => {
                this.setParam(event.target.getAttribute('name'), event.target.value);
                clearTimeout(delayTimer);
                delayTimer = setTimeout(function() {
                    StatisticChart.events.emit('statistic_chart_filter_changed');
                }, 300);
            };
            fields = form.querySelectorAll('input, select');
            for (let field of fields) {
                field.addEventListener('change', onChangeField);
            }

            StatisticChart.events.emit('statistic_chart_filter_init');
        }
    }
})();

const Drawer = (function() {
    let data;
    let container;
    let svg;
    let hoverLine;

    const defaultSteps = { x: 10, y: 8 };
    const size = { width: 700, height: 400 };
    const padding = { left: 70, bottom: 50 };
    const minMax = {};
    const tooltipTitleTemplate = document.getElementById('stat-tootip').innerHTML;
    const intl = new Intl.NumberFormat();

    return {
        sortDataByKey(arr, key) {
            if (arr[0] && arr[0][key]) {
                arr.sort(function(a, b){
                    const val1 = a[key];
                    const val2 = b[key];
                    let result = 0;
                    if (val1 < val2) {
                        result = -1;
                    } else if (val1 > val2) {
                        result = 1;
                    }
                    return result;
                });
            }
        },
        getChartWidth() {
            return size.width - padding.left - 25;
        },
        getChartHeight() {
            return size.height - padding.bottom - 15;
        },
        formatDate(date) {
            return `0${date.getDate()}`.slice(-2) +
                '.' + `0${date.getMonth() + 1}`.slice(-2) +
                '.' + date.getFullYear() +
                '\n' + `0${date.getHours()}`.slice(-2) +
                ':' + `0${date.getMinutes()}`.slice(-2);
        },
        legendY() {
            this.sortDataByKey(data, 'value');
            const min = data[0].value;
            const max = data[data.length - 1].value;
            minMax['value'] = {min: min, max: max};
            const maxStep = data.length > defaultSteps.y ? defaultSteps.y : data.length;
            const chartHeight = this.getChartHeight();
            const stepOffset = chartHeight / maxStep;
            const stepValue = (max - min) / maxStep;
            let step = 0;
            while (step <= maxStep) {
                const yOffset = size.height - padding.bottom - stepOffset * step;
                svg.line(padding.left, yOffset, size.width, yOffset).stroke({ color: 'rgba(0,0,0,0.1)', width: 1 });
                let value = Math.round(min + stepValue * step)
                value = value > max ? max : value;
                const text = svg.plain(intl.format(value))
                    .font({
                        size: 10,
                        anchor: 'end',
                    })
                    .fill('#333');
                text.move(padding.left - 8 - text.bbox().width, yOffset - Math.round(text.bbox().height / 2));
                step++;
            }
        },
        legendX() {
            this.sortDataByKey(data, 'time');
            const min = data[0].time;
            const max = data[data.length - 1].time;
            minMax['time'] = {min: min, max: max};
            const maxStep = data.length > defaultSteps.x ? defaultSteps.x : data.length;
            const chartWidth = this.getChartWidth();
            const stepOffset = chartWidth / maxStep;
            const stepValue = (max - min) / maxStep;
            let step = 0;
            const intl = new Intl.NumberFormat();
            while (step <= maxStep) {
                const xOffset = padding.left + stepOffset * step;
                svg.line(xOffset, size.height - padding.bottom, xOffset, 0).stroke({ color: 'rgba(0,0,0,0.1)', width: 1 });
                const value = Math.round(min + stepValue * step)
                const date = new Date((value > max ? max : value) * 1000);
                const text = svg.text(this.formatDate(date))
                    .font({
                        size: 10,
                        anchor: 'middle',
                    })
                    .fill('#333');
                text.move(xOffset - Math.round(text.bbox().width/2), size.height - padding.bottom + 10);
                step++;
            }
        },
        getDotCoordinates(item) {
            const x = padding.left + ((item.time - minMax['time'].min) / (minMax['time'].max - minMax['time'].min)) * this.getChartWidth();
            const y = size.height - padding.bottom - ((item.value - minMax['value'].min) / (minMax['value'].max - minMax['value'].min)) * this.getChartHeight();
            return [x, y];
        },
        addCirclePoint(item, coords, color) {
            svg.circle(6).center(coords[0], coords[1]).fill('none').addClass('chart__point')
                .data({
                    'color': color,
                    'tippy-content': templateString(tooltipTitleTemplate,
                    {
                        date: this.formatDate(new Date(item.time * 1000)),
                        value: intl.format(item.value)
                    })
                });
        },
        drawChartStep5() {
            const blue = '#007bff';
            const dots = [];
            for (const item of data) {
                const coords = this.getDotCoordinates(item);
                dots.push(coords);
                this.addCirclePoint(item, coords, blue);
            }
            svg.polyline(dots).stroke({ color: blue, width: 1, linecap: 'round', linejoin: 'round' }).fill('none').back();
        },
        drawChartStep30() {
            const colors = {
                min: { color: '#007bff', name: 'Минимум' },
                middle: { color: '#6c757d', name: 'Среднее'},
                max: { color: '#00aa5b', name: 'Масимум'},
            };
            const lines = {min: [], middle: [], max:[]};
            const groupedData = {};
            const min = data[0].time;
            const max = data[data.length - 1].time;
            const step = 1800;
            let stepValue = min + step;
            for (const item of data) {
                if (item.time > stepValue) {
                    stepValue += step;
                    if (stepValue > max) {
                        stepValue = max;
                    }
                }
                if (!groupedData[stepValue]) {
                    groupedData[stepValue] = [];
                }
                groupedData[stepValue].push(item);
            }
            const appendDotToLine = (lineName, item) => {
                const coords = this.getDotCoordinates(item);
                lines[lineName].push(coords);
                this.addCirclePoint(item, coords, colors[lineName].color);
            }
            for (const time in groupedData) {
                if (!groupedData.hasOwnProperty(time)) {
                    continue;
                }
                const group = groupedData[time];
                this.sortDataByKey(group, 'value');

                appendDotToLine('min', {
                    time: time,
                    value: group[0].value,
                });

                appendDotToLine('middle', {
                    time: time,
                    value: Math.round(group.reduce(function(sum, item) { return sum + item.value; }, 0) / group.length),
                });

                appendDotToLine('max', {
                    time: time,
                    value: group[group.length - 1].value,
                });
            }
            svg.polyline(lines.max).stroke({ color: colors.max.color, width: 1, linecap: 'round', linejoin: 'round' }).fill('none').back();
            svg.polyline(lines.middle).stroke({ color: colors.middle.color, width: 1, linecap: 'round', linejoin: 'round' }).fill('none').back();
            svg.polyline(lines.min).stroke({ color: colors.min.color, width: 1, linecap: 'round', linejoin: 'round' }).fill('none').back();

            let lastOffset = padding.left + 10;
            for (const k in colors) {
                if (!colors.hasOwnProperty(k)) {
                    continue;
                }
                const color = colors[k];
                svg.rect(10, 10).move(lastOffset, 10).fill(color.color);
                const text = svg.plain(color.name).font({
                    size: 12,
                    anchor: 'start',
                });
                text.fill(color.color).move(lastOffset + 13, 7);
                lastOffset += text.bbox().width + 25;
            }
        },
        drawChart() {
            if (parseInt(Filter.getParam('stat-step')) === 30) {
                this.drawChartStep30();
            } else {
                this.drawChartStep5();
            }
            import(/* webpackChunkName: "tippyjs" */ 'tippy.js/dist/tippy.cjs').then(({ default: tippy, hideAll: hideAll }) => {
                global.tippy = tippy;
                global.tippyHideAll = hideAll;
                    tippy('.chart__point', {
                    allowHTML: true,
                });
            });
        },
        clean() {
            svg.clear();
        },
        update() {
            this.clean();
            if (data.length >= 2) {
                this.legendY();
                this.legendX();
                this.drawChart();
                hoverLine = svg.rect(1, size.height - padding.bottom).fill('#f00').move(-5, 0).opacity('0.35');
            } else {
                svg.plain('Нет данных для построения графика.')
                    .font({
                        size: 20,
                        anchor: 'middle',
                    })
                    .fill('#f00')
                    .center(size.width/2, size.height/2);
            }
            StatisticChart.events.emit('statistic_chart_drawer_update');
        },
        setData(newData) {
            data = newData;
            this.update();
        },
        init(root) {
            import(/* webpackChunkName: "svgjs" */ '@svgdotjs/svg.js/src/svg').then(({ default: SVG }) => {
                global.SVG = SVG;
                container = root;
                svg = SVG().addTo(container).viewbox(0, 0, size.width, size.height);
                svg.addClass('chart__canvas');

                svg.mousemove(function(event) {
                    const point = svg.point(event.screenX, event.screenY);
                    if (point.x > padding.left) {
                        hoverLine.move(point.x, 0);
                        for (const cirlce of svg.find('.chart__point')) {
                            if (hoverLine.inside(cirlce.cx(), cirlce.cy())) {
                                cirlce.stroke({ color: cirlce.data('color'), width: 3 });
                                cirlce.node._tippy && cirlce.node._tippy.show();
                            } else {
                                cirlce.stroke('none');
                                cirlce.node._tippy && cirlce.node._tippy.hide();
                            }
                        }
                    } else {
                        hoverLine.move(-5, 0);
                        svg.find('.chart__point').stroke('none');
                        tippyHideAll && tippyHideAll();
                    }
                });
                svg.mouseleave(function(event) {
                     hoverLine.move(-5, 0);
                     svg.find('.chart__point').stroke('none');
                     tippyHideAll && tippyHideAll();
                });

                StatisticChart.events.on('statistic_chart_filter_changed', (eventData) => {
                    this.setData(DataLoader.randomData());
                    this.update();
                });

                this.setData(DataLoader.randomData());
            });
            StatisticChart.events.emit('statistic_chart_drawer_init');
        }
    }
})();

const StatisticChart = (function() {
    let disableHistory = false;

    return {
        events: null,
        init() {
            this.events = new Events;

            const filterForm = document.getElementById('stat-filter');
            if (filterForm) {
                Filter.init(filterForm);
            }

            const chartContainer = document.getElementById('stat-chart');
            if (chartContainer) {
                Drawer.init(chartContainer);
            }

            StatisticChart.events.on('statistic_chart_filter_changed', (eventData) => {
                const oldUrl = URI();
                const newUrl = Filter.getUrl();
                if (!disableHistory && newUrl.toString() !== oldUrl.toString()) {
                     window.history.pushState(newUrl.toString(), document.title, newUrl.toString());
                }
            });

            window.onpopstate = function(ev) {
                disableHistory = true
                let url = new URI();
                Filter.syncWithUrl();
                StatisticChart.events.emit('statistic_chart_filter_changed');
                disableHistory = false;
            };
        }
    };
})();

export default StatisticChart;
var global=function(t){function e(e){for(var r,o,l=e[0],c=e[1],u=e[2],d=0,f=[];d<l.length;d++)o=l[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(s&&s(e);f.length;)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,l=1;l<n.length;l++){var c=n[l];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},a={0:0},i=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.e=function(t){var e=[],n=a[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=a[t]=[e,r]}));e.push(n[2]=r);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.src=function(t){return o.p+""+({3:"vendors~svgjs",4:"vendors~tippyjs"}[t]||t)+".js"}(t);var c=new Error;i=function(e){l.onerror=l.onload=null,clearTimeout(u);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;c.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",c.name="ChunkLoadError",c.type=r,c.request=i,n[1](c)}a[t]=void 0}};var u=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(e)},o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/static/awrtest/js/",o.oe=function(t){throw console.error(t),t};var l=window.webpackJsonp_name_=window.webpackJsonp_name_||[],c=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var s=c;return i.push([102,1,2]),n()}({101:function(t,e,n){"use strict";n(36),n(44),n(75);function r(t,e){if(t){t.innerHTML=e;for(var n=[],r=t.querySelectorAll("script"),a=0;r[a];a+=1)!n||r[a].type&&"text/javascript"!==r[a].type.toLowerCase()||(r[a].parentNode?n.push(r[a].parentNode.removeChild(r[a])):n.push(r[a]));n.length&&n.forEach((function(t){!function(t){var e=t.text||t.textContent||t.innerHTML||"",n=document.getElementsByTagName("head")[0]||document.documentElement,r=document.createElement("script");r.type="text/javascript";try{r.appendChild(document.createTextNode(e))}catch(t){r.text=e}n.insertBefore(r,n.firstChild),n.removeChild(r),t.parentNode&&t.parentNode.removeChild(t)}(t)}))}}var a={init:function(){document.addEventListener("submit",(function(t){if("FORM"===t.target.tagName&&void 0!==t.target.dataset.ajax){t.preventDefault();var e=new FormData(t.target),n=t.target.getAttribute("action"),a=t.target.getAttribute("method")?t.target.getAttribute("method"):"POST";t.target.querySelector('button[type="submit"], input[type="submit"]').setAttribute("disabled",!0),fetch(n,{method:a,cache:"no-cache",credentials:"same-origin",headers:{"X-Requested-With":"XMLHttpRequest"},body:e}).then((function(t){return t.text()})).then((function(e){var n,a,i,o=(n=e,a=":scope > form[data-ajax]",(i=document.createElement("div")).innerHTML=n,i.querySelector(a));o?t.target.replaceWith(o):r(t.target.closest('[data-id="replace-on-submit"]'),e)}))}}))}};e.a=a},102:function(t,e,n){t.exports=n(103)},103:function(t,e,n){"use strict";n.r(e),function(t){var e=n(101),r=n(59),a=n(99),i={events:new r.a};t.Events=r.a,t.app=i,i.events.on("ready",(function(){e.a.init(),a.a.init()})),document.addEventListener("DOMContentLoaded",(function(){i.events.emit("ready")}))}.call(this,n(24))},59:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));n(75),n(77),n(54),n(82),n(36),n(44),n(83),n(129),n(85);function r(){var t={},e=[];this.on=function(n,r,a){void 0===a&&(a=100),(Array.isArray(n)?n:[n]).forEach((function(n){t[n]=t[n]||[],t[n].push({fn:r,priority:a}),e[n]&&r(e[n].data)}))},this.emit=function(n,r){if(e[n]||(e[n]={data:r}),t[n]){t[n].sort((function(t,e){return t.priority-e.priority}));var a=[];return t[n].forEach((function(t){a.push(Promise.resolve(t.fn(r)))})),Promise.all(a)}return Promise.resolve()},this.debugEvents=function(n){console.log(n,t,e)}}},99:function(t,e,n){"use strict";(function(t){n(130),n(132),n(133),n(134),n(136),n(77),n(54),n(137),n(139),n(82),n(142),n(143),n(36),n(144),n(44),n(89),n(148),n(83),n(149),n(85),n(153);var r,a,i,o,l,c=n(100),u=n.n(c),s=n(23),d=n.n(s),f=(r=[],{getData:function(){return r},loadData:function(){},randomData:function(){for(var t=[],e=h.getParam("stat-start"),n=e?new Date(e):new Date(2019,0,1),r=h.getParam("stat-end"),a=r?new Date(r):new Date(2019,0,2);n<a;)n.setTime(n.getTime()+3e5),t.push({time:Math.round(n.getTime()/1e3),value:Math.floor(1e5*Math.random())+1});return t}}),h=(o={},{setParam:function(t,e){e?o[t]=e:delete o[t]},getParam:function(t){return o[t]},syncWithUrl:function(){var t=d()();for(var e in o=t.search(!0))if(o.hasOwnProperty(e)){var n=a.querySelector('[name="'+e+'"]');n&&(n.value=o[e])}},getUrl:function(){var t=d()();return t.search(o),t},init:function(t){var e=this;a=t,this.syncWithUrl();var n=function(t){e.setParam(t.target.getAttribute("name"),t.target.value),clearTimeout(i),i=setTimeout((function(){v.events.emit("statistic_chart_filter_changed")}),300)},r=a.querySelectorAll("input, select"),o=Array.isArray(r),l=0;for(r=o?r:r[Symbol.iterator]();;){var c;if(o){if(l>=r.length)break;c=r[l++]}else{if((l=r.next()).done)break;c=l.value}c.addEventListener("change",n)}v.events.emit("statistic_chart_filter_init")}}),m=function(){var e,r,a,i,o=10,l=8,c=700,s=400,d=70,m=50,p={},g=document.getElementById("stat-tootip").innerHTML,y=new Intl.NumberFormat;return{sortDataByKey:function(t,e){t[0]&&t[0][e]&&t.sort((function(t,n){var r=t[e],a=n[e],i=0;return r<a?i=-1:r>a&&(i=1),i}))},getChartWidth:function(){return c-d-25},getChartHeight:function(){return s-m-15},formatDate:function(t){return("0"+t.getDate()).slice(-2)+"."+("0"+(t.getMonth()+1)).slice(-2)+"."+t.getFullYear()+"\n"+("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)},legendY:function(){this.sortDataByKey(e,"value");var t=e[0].value,n=e[e.length-1].value;p.value={min:t,max:n};for(var r=e.length>l?l:e.length,i=this.getChartHeight()/r,o=(n-t)/r,u=0;u<=r;){var f=s-m-i*u;a.line(d,f,c,f).stroke({color:"rgba(0,0,0,0.1)",width:1});var h=Math.round(t+o*u);h=h>n?n:h;var v=a.plain(y.format(h)).font({size:10,anchor:"end"}).fill("#333");v.move(d-8-v.bbox().width,f-Math.round(v.bbox().height/2)),u++}},legendX:function(){this.sortDataByKey(e,"time");var t=e[0].time,n=e[e.length-1].time;p.time={min:t,max:n};var r=e.length>o?o:e.length,i=this.getChartWidth()/r,l=(n-t)/r,c=0;for(new Intl.NumberFormat;c<=r;){var u=d+i*c;a.line(u,s-m,u,0).stroke({color:"rgba(0,0,0,0.1)",width:1});var f=Math.round(t+l*c),h=new Date(1e3*(f>n?n:f)),v=a.text(this.formatDate(h)).font({size:10,anchor:"middle"}).fill("#333");v.move(u-Math.round(v.bbox().width/2),s-m+10),c++}},getDotCoordinates:function(t){return[d+(t.time-p.time.min)/(p.time.max-p.time.min)*this.getChartWidth(),s-m-(t.value-p.value.min)/(p.value.max-p.value.min)*this.getChartHeight()]},addCirclePoint:function(t,e,n){a.circle(6).center(e[0],e[1]).fill("none").addClass("chart__point").data({color:n,"tippy-content":u()(g,{date:this.formatDate(new Date(1e3*t.time)),value:y.format(t.value)})})},drawChartStep5:function(){var t=[],n=e,r=Array.isArray(n),i=0;for(n=r?n:n[Symbol.iterator]();;){var o;if(r){if(i>=n.length)break;o=n[i++]}else{if((i=n.next()).done)break;o=i.value}var l=o,c=this.getDotCoordinates(l);t.push(c),this.addCirclePoint(l,c,"#007bff")}a.polyline(t).stroke({color:"#007bff",width:1,linecap:"round",linejoin:"round"}).fill("none").back()},drawChartStep30:function(){var t=this,n={min:{color:"#007bff",name:"Минимум"},middle:{color:"#6c757d",name:"Среднее"},max:{color:"#00aa5b",name:"Масимум"}},r={min:[],middle:[],max:[]},i={},o=e[0].time,l=e[e.length-1].time,c=o+1800,u=e,s=Array.isArray(u),f=0;for(u=s?u:u[Symbol.iterator]();;){var h;if(s){if(f>=u.length)break;h=u[f++]}else{if((f=u.next()).done)break;h=f.value}var m=h;m.time>c&&(c+=1800)>l&&(c=l),i[c]||(i[c]=[]),i[c].push(m)}var v=function(e,a){var i=t.getDotCoordinates(a);r[e].push(i),t.addCirclePoint(a,i,n[e].color)};for(var p in i)if(i.hasOwnProperty(p)){var g=i[p];this.sortDataByKey(g,"value"),v("min",{time:p,value:g[0].value}),v("middle",{time:p,value:Math.round(g.reduce((function(t,e){return t+e.value}),0)/g.length)}),v("max",{time:p,value:g[g.length-1].value})}a.polyline(r.max).stroke({color:n.max.color,width:1,linecap:"round",linejoin:"round"}).fill("none").back(),a.polyline(r.middle).stroke({color:n.middle.color,width:1,linecap:"round",linejoin:"round"}).fill("none").back(),a.polyline(r.min).stroke({color:n.min.color,width:1,linecap:"round",linejoin:"round"}).fill("none").back();var y=d+10;for(var b in n)if(n.hasOwnProperty(b)){var w=n[b];a.rect(10,10).move(y,10).fill(w.color);var _=a.plain(w.name).font({size:12,anchor:"start"});_.fill(w.color).move(y+13,7),y+=_.bbox().width+25}},drawChart:function(){30===parseInt(h.getParam("stat-step"))?this.drawChartStep30():this.drawChartStep5(),n.e(4).then(n.t.bind(null,196,7)).then((function(e){var n=e.default,r=e.hideAll;t.tippy=n,t.tippyHideAll=r,n(".chart__point",{allowHTML:!0})}))},clean:function(){a.clear()},update:function(){this.clean(),e.length>=2?(this.legendY(),this.legendX(),this.drawChart(),i=a.rect(1,s-m).fill("#f00").move(-5,0).opacity("0.35")):a.plain("Нет данных для построения графика.").font({size:20,anchor:"middle"}).fill("#f00").center(c/2,s/2),v.events.emit("statistic_chart_drawer_update")},setData:function(t){e=t,this.update()},init:function(e){var o=this;n.e(3).then(n.bind(null,197)).then((function(n){var l=n.default;t.SVG=l,r=e,(a=l().addTo(r).viewbox(0,0,c,s)).addClass("chart__canvas"),a.mousemove((function(t){var e=a.point(t.screenX,t.screenY);if(e.x>d){i.move(e.x,0);var n=a.find(".chart__point"),r=Array.isArray(n),o=0;for(n=r?n:n[Symbol.iterator]();;){var l;if(r){if(o>=n.length)break;l=n[o++]}else{if((o=n.next()).done)break;l=o.value}var c=l;i.inside(c.cx(),c.cy())?(c.stroke({color:c.data("color"),width:3}),c.node._tippy&&c.node._tippy.show()):(c.stroke("none"),c.node._tippy&&c.node._tippy.hide())}}else i.move(-5,0),a.find(".chart__point").stroke("none"),tippyHideAll&&tippyHideAll()})),a.mouseleave((function(t){i.move(-5,0),a.find(".chart__point").stroke("none"),tippyHideAll&&tippyHideAll()})),v.events.on("statistic_chart_filter_changed",(function(t){o.setData(f.randomData()),o.update()})),o.setData(f.randomData())})),v.events.emit("statistic_chart_drawer_init")}}}(),v=(l=!1,{events:null,init:function(){this.events=new Events;var t=document.getElementById("stat-filter");t&&h.init(t);var e=document.getElementById("stat-chart");e&&m.init(e),v.events.on("statistic_chart_filter_changed",(function(t){var e=d()(),n=h.getUrl();l||n.toString()===e.toString()||window.history.pushState(n.toString(),document.title,n.toString())})),window.onpopstate=function(t){l=!0,new d.a,h.syncWithUrl(),v.events.emit("statistic_chart_filter_changed"),l=!1}}});e.a=v}).call(this,n(24))}});
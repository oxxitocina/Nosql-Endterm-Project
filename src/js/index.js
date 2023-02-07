import Chart from 'chart.js/auto';
import { UI_ELEMENTS } from './views.js';
import * as data from './gpu_data_filtered.json';
import * as hdmiSupportData from '../../json/hdmiSupport.json'
import * as vgaSupport from '../../json/vgaSupport.json'
import * as dviSupportData from '../../json/dviSupport.json'
import * as vramData from '../../json/vramData.json'
import * as topCheapest from '../../json/topCheapest.json'
import * as topExpensive from '../../json/topValue.json'
import * as clockRatioData from '../../json/clock_ratio.json'

const title = [];
const priceAndClock = [];

data.forEach(function(item) {
    title.push({title: item.title})
    priceAndClock.push({
        price: item.specifications.price,
        clock: item.specifications.clock,
    })
})

const RATIO_CHART = new Chart(UI_ELEMENTS.RATIO_CHART, 
    {
        type: 'bubble',
        data: {
            labels: title.map(x => x.title),
            datasets: [{
                label: 'GPU. Clock Speed/Price Ratio. Min 8GB. 1500Ghz-2000Ghz',
                data: priceAndClock.map(row => ({
                    x: row.price,
                    y: row.clock,
                    z: 2,
                })),
                backgroundColor: [
                    'white'
                ],
                borderColor: [
                    'blue',
                ],
                borderWidth: 5
            }],
        },
        options: {
            responsive: false,
        },
    }) 

    const CLOCK_RATIO_CHART = new Chart(UI_ELEMENTS.CLOCK_RATIO_CHART, 
        {
            type: 'bubble',
            data: {
                labels: clockRatioData.map(x => x.title),
                datasets: [{
                    label: 'GPU. Clock Speed/Price Ratio',
                    data: clockRatioData.map(row => ({
                        x: row.specifications.price,
                        y: row.specifications.clock,
                        z: 2,
                    })),
                    backgroundColor: [
                        'white'
                    ],
                    borderColor: [
                        'blue',
                    ],
                    borderWidth: 5
                }],
            },
            options: {
                responsive: false,
            },
        }) 

const VRAM_RATIO_CHART = new Chart(UI_ELEMENTS.VRAM_RATIO_CHART,
    {
        type: 'bubble',
        data: {
            labels: vramData.map(x => x.title),
            datasets: [{
                label: 'GPU. VRAM/Price Ratio',
                data: vramData.map(row => ({
                    x: row.specifications.price,
                    y: row.specifications.vram,
                    z: 2,
                })),
                backgroundColor: [
                    'white'
                ],
                borderColor: [
                    'rgb(119, 50, 168)',
                ],
                borderWidth: 5
            }],
        },
        options: {
            responsive: false,
        },
})

const EXPENSIVE_CHART = new Chart(UI_ELEMENTS.EXPENSIVE_CHART,
    {
        type: 'bar',
        data: {
            labels: topExpensive.map(x => x.title),
            datasets: [{
                label: 'Top expensive',
                data: topExpensive.map(row => ({
                    x: row.title,
                    y: row.specifications.price,
                    z: 2,
                })),
                backgroundColor: [
                    'white'
                ],
                borderColor: [
                    'rgb(119, 50, 168)',
                ],
                borderWidth: 5
            }],
        },
        options: {
            responsive: false,
        },
})

const CHEAPEST_CHART = new Chart(UI_ELEMENTS.CHEAPEST_CHART,
    {
        type: 'bar',
        data: {
            labels: topCheapest.map(x => x.title),
            datasets: [{
                label: 'Top cheap',
                data: topCheapest.map(row => ({
                    x: row.title,
                    y: row.specifications.price,
                    z: 2,
                })),
                backgroundColor: [
                    'white'
                ],
                borderColor: [
                    'rgb(119, 50, 168)',
                ],
                borderWidth: 5
            }],
        },
        options: {
            responsive: false,
        },
})

const CONNECTORS_PIE_CHART = new Chart(UI_ELEMENTS.CONNECTORS_PIE_CHART, {
    type: 'doughnut',
    data:   {
        labels: ["HDMI", "DVI-D", "VGA"],
        datasets: [{
            label: 'Connectors Popularity',
            data: [hdmiSupportData.length, dviSupportData.length, vgaSupport.length],
            backgroundColor: [
                'red',
                'blue',
                'green',
            ],
        }]
    },
    options: {
        responsive: false,
    },
})

function renderTable(data, src)  {
        data.forEach(function(item) {
            let clon = UI_ELEMENTS.TABLE_TEMPLATE.content.cloneNode(true);
            clon.querySelector('#tableID').textContent = item.id;
            clon.querySelector('#table-title').textContent = item.title;
            clon.querySelector('#table-specifications').textContent = item.specifications.price+'T' + ' ' + item.specifications.clock+'GHz' + ' ' + item.specifications.vram+'GB';
            clon.querySelector('#table-connectors').textContent = item.connectorsArray;
            src.append(clon);
        })
    }

renderTable(hdmiSupportData, UI_ELEMENTS.TABLE_BODY);
renderTable(vgaSupport, UI_ELEMENTS.TABLE_VGA_BODY)
renderTable(dviSupportData, UI_ELEMENTS.TABLE_DVI_BODY)








const { default: axios } = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://shop.kz/videokarty'
const pageNumber = 9;
const gpu_data = [];

async function parse(url)  {

    let counter = 0;

    for(let i = 0; i <= pageNumber; i++)   {
        
        const response = await axios.get(`${url}?PAGEN_1=${i}`);
        const $ = cheerio.load(response.data);

        const gpu = $('.bx_catalog_item');

        gpu.each(function() {
            counter = counter + 1;

            title = $(this).find('.bx_catalog_item_title_text').text();

            price = $(this).find('.old_price').text();
            price = price.replace(/\D/g,'');
            price = Number(price);

            clock = $(this).find('.bx_catalog_item_articul span:nth-child(4)').text();
            clock = clock.replace(/\D/g,'');
            clock = Number(clock);

            vramClock = $(this).find('.bx_catalog_item_articul span:nth-child(6)').text();
            vramClock = vramClock.replace(/\D/g,'');
            vramClock = Number(vramClock);

            vramType = $(this).find('.bx_catalog_item_articul span:nth-child(8)').text();

            vram = $(this).find('.bx_catalog_item_articul span:nth-child(10)').text();
            vram = vram.replace(/\D/g,'');
            vram = Number(vram);

            specifications = {price, clock, vramClock, vramType, vram};

            id = counter;

            connectors =  $(this).find('.bx_catalog_item_articul span:last').text();
            connectorsArray = [];
            connectorsArray = connectors.split(';')

            gpu_data.push({id, title, specifications, connectorsArray})     
        })
    }

    console.log(gpu_data)
    const json = JSON.stringify(gpu_data);
    fs.writeFileSync('../../json/gpu_data.json', json)

}
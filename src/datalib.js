const dl = require('datalib');
const fs = require('fs');
const path = require('path');

const opt= {
    delimiter: ';'
}
//const filePath = path.join('data', 'affiliation-20180625-060000.csv');
//const filePath = path.join('data', 'stocks.csv');
//const data = dl.dsv(filePath, opt);

const filePath = path.join('data', 'sirc-17804_9075_61173_201805_L_M_20180601_020957358.csv');

const readStream = fs.createReadStream(filePath, {encoding:'utf-8'});
const data = dl.dsv(readStream, opt);


// Show summary statistics for each column of the data table.
console.log(dl.format.summary(data));
//const summary = dl.summary(data);
//console.log(  summary);
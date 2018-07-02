const fs = require('fs');
const path = require('path');
const dl = require('datalib');

const file = path.join('./data', 'etalab_cs1100507_stock_20180608-0437.csv');
const data = dl.dsv(file, {delimiter:';'});

//const file = path.join('./data', 'fr.openfoodfacts.org.products.csv');
//const data = dl.dsv(file, {delimiter:'/t'});

// Show summary statistics for each column of the data table.
console.log( dl.format.summary(data));

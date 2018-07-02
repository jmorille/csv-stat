const papa = require('papaparse');
const fs = require('fs');
const path = require('path');

function stepCsv(results, parser) {
    if (results.meta.cursor % 100000 == 0) {
        const diff = process.hrtime(hrstart);
        const elapseTime = `${diff[0]}s ${Math.floor(diff[1] / 1000000)}ms`;
        console.log("Read " , results.meta.cursor, "Lines in", elapseTime, results.meta)
    }
    if (results.errors.length ) {
        console.log("Row errors:", results.errors);
    }

}

const opt= {
    delimiter: ';',
    fastMode: true,
    step: stepCsv,
    complete: function(results, file) {
        console.log("Parsing complete:", results);
        console.log("Parsing complete Files:", file);
        const diff = process.hrtime(hrstart);
        const elapseTime = `${diff[0]}s ${Math.floor(diff[1] / 1000000)}ms`;
        console.log("in", elapseTime);
    }
};

//const filePath = path.join('data', 'affiliation-20180625-060000.csv');
//const filePath = path.join('data', 'stocks.csv');
//const data = dl.dsv(filePath, opt);

const filePath = path.join('data', 'sirc-17804_9075_61173_201805_L_M_20180601_020957358.csv');
// Start timer
const hrstart = process.hrtime();
// Start read
const readStream = fs.createReadStream(filePath, {encoding:'utf-8'});
const data = papa.parse(readStream, opt);
// End timer
const diff = process.hrtime(hrstart);
const elapseTime = `${diff[0]}s ${Math.floor(diff[1] / 1000000)}ms`;


console.log(data);
console.log("in", elapseTime);

// Show summary statistics for each column of the data table.
//const summary = dl.summary(data);
//console.log(  summary);
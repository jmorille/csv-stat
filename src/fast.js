const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

// delimiter: ';',
const csvOpt = {
    delimiter: '\t',
    headers: false,
    strictColumnHandling: false,
    quote: null
};


const file = path.join('./data', 'fr.openfoodfacts.org.products.csv');
//const file = path.join('./data', 'etalab_cs1100507_stock_20180608-0437.csv');
const stream = fs.createReadStream(file);

const stat = {
    count: 0,
    cols: {},
    error: 0
};
let count = 0;
let countErr = 0;

const hrstart = process.hrtime();
csv
    .fromStream(stream, csvOpt)
    .on("data", (data)=>{
        //console.log(data);
       // count++;
        stat.count+= 1;
        const countCols = data.length;
        const currentCount = stat.cols[countCols] | 0;
        stat.cols[countCols]= currentCount+1 ;
        if (countCols == 147)  {
            //console.log(data);
        }
    })
    .on("error", (err)=> {
        console.log(err);
        stat.error= stat.error+1
    })
    .on("end", ()=>{
        const diff = process.hrtime(hrstart);
        const elapseTime = `${diff[0]}s ${Math.floor(diff[1] / 1000000)}ms`;
        console.log("done", count, stat, 'in', elapseTime);
    });

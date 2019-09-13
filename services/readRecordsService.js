const fs = require('fs');
const path = require('path');
const util = require('util');
const {spawn} = require('child_process');
const readFile = util.promisify(fs.readFile);

async function readRecords(location) {
    return new Promise(async function(resolve, reject){
        let records = await readFile(location, 'utf8');
        records = '{"records": [' + records.replace(/\n$/g,'').replace(/,$/,'') + ']}';
        resolve(records);
    });
}

module.exports = {
    readRecords,
};
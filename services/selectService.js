const fs = require('fs');
const path = require('path');
const util = require('util');
const {spawn} = require('child_process');
const exists = util.promisify(fs.exists);
const {readRecords} = require('./readRecordsService'); 
    
async function select(req, res, query) {
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d, 'Tables');
    let records;
    if(!await exists(path.join(location, query.table)))
        throw new Error("table does'nt exist")
    if(typeof query.join === 'undefined'){
        records = JSON.parse(await readRecords(path.join(location, query.table, 'records', 'index.txt')));
        return query.selectedColumns.length === 0 ? res.json(records) : res.json(filterColumns(records, query));
    }
    else{
        const table1 = await readRecords(path.join(location, query.table, 'records', 'index.txt'));
        const table2 = await readRecords(path.join(location, query.join.table, 'records', 'index.txt'));
        let child = spawn('node', [path.join(__dirname, 'childService', 'joinService.js'), table1, table2, JSON.stringify(query)]);
        let r = '';
        child.stdout.on('data', chunk => r += chunk);
        child.stdout.on('end', () => {
            r = JSON.parse(r);
            return query.selectedColumns.length === 0 ? res.json(r) : res.json(filterColumns(r, query));
        });
    }
}

function filterColumns(records, query) {
    let r = [];
    for(let i=0;i<records.records.length;i++){
        let newObj = {};
        for(let j=0;j<query.selectedColumns.length;j++) {
            newObj[query.selectedColumns[j]] = records.records[i][query.selectedColumns[j]];
        }r.push(newObj);
    }
    return {records: r};
}

module.exports = {
    select,
}
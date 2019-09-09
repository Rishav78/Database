const fs = require('fs');
const path = require('path');
const util = require('util');
const {spawn} = require('child_process');
const exists = util.promisify(fs.exists),
      readFile = util.promisify(fs.readFile),
      appendFile = util.promisify(fs.appendFile),
      mkdir = util.promisify(fs.mkdir),
      writeFile = util.promisify(fs.writeFile);
    
async function select(req, res, query) {
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d, 'Tables');
    if(!await exists(path.join(location, query.table)))
        throw new Error("table does'nt exist")
    if(typeof query.join === 'undefined')
        return res.json(JSON.parse(await readRecords(path.join(location, query.table, 'records', 'index.txt'))));
    
    const table1 = await readRecords(path.join(location, query.table, 'records', 'index.txt'));
    const table2 = await readRecords(path.join(location, query.join.table, 'records', 'index.txt'));
    let child = spawn('node', [path.join(__dirname, 'joinService.js'), table1, table2, JSON.stringify(query)]);
    let records = '';
    child.stdout.on('data', chunk => records += chunk);
    child.stdout.on('end', () => res.json(JSON.parse(records)));
}

async function readRecords(location) {
    return new Promise(async function(resolve, reject){
        let records = await readFile(location, 'utf8');
        records = '{"records": [' + records.replace(/\n$/g,'').replace(/,$/,'') + ']}';
        resolve(records);
    });
}

function filterColumns(records, query) {
    let r = [];
    for(let i=0;i<records.records.length;i++){
        let newObj = {};
        for(let j=0;j<query.selectedColumns.length;j++) 
            newObj[query.selectedColumns[j]] = records.records[i][query.selectedColumns[j]];
        r.push(newObj);
    }
    return r;
}

async function join(tables, query, location) {
    spawn()
    return records;
}

module.exports = {
    select,
}
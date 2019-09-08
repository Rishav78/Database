const fs = require('fs');
const path = require('path');
const util = require('util');
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
    let records = await readFile(path.join(location, query.table, 'records', 'index.txt'), 'utf8');
    records = '{"records": [' + records.replace(/\n$/g,'').replace(/,$/,'') + ']}';
    records = JSON.parse(records);
    if(query.selectedColumns.length!==0)
        for(let i=0;i<records.records.length;i++){
            let newObj = {};
            for(let j=0;j<query.selectedColumns.length;j++) 
                newObj[query.selectedColumns[j]] = records.records[i][query.selectedColumns[j]];
            records.records[i] = newObj;
        }
    return res.json(records);
}

module.exports = {
    select,
}
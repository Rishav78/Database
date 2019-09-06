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
    if(!await exists(path.join(location, query.table, 'index.txt')))
        return res.json({success: false, msg: "table does'nt exist"});
    let records = await readFile(path.join(location, query.table, 'index.txt'), 'utf8');
    records = '{"records": [' + records.replace(/,$/,'') + ']}';
    records = JSON.parse(records);
    if(query.selectedColumns.length===0)
        res.json(records);
}

module.exports = {
    select,
}
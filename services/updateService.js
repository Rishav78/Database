const fs = require('fs');
const path = require('path');
const util = require('util');
const {spawn} = require('child_process');
const exists = util.promisify(fs.exists),
      writeFile = util.promisify(fs.writeFile) ;

async function update(req, res, query) {
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d, 'Tables');
    console.log(query);
    if(!await exists(path.join(location, query.table)))
        throw new Error("table does'nt exist")

    const child = spawn('node', [path.join(__dirname, 'childService', 'updateService.js'), path.join(location, query.table, 'records', 'index.txt'), JSON.stringify(query)]);
    let records = '';
    child.stdout.on('data', chunk => records += chunk);
    child.stdout.on('end', async () => {
        records = records.replace(/^\[/, '').replace(/\]$/, '');
        console.log(records);
        // let a = await writeFile(path.join(location, query.table, 'records', 'index.txt'), records);
        // res.json({success: true});
    })
    
}

module.exports = {
    update,
};
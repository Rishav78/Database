const fs = require('fs');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists),
      appendFile = util.promisify(fs.appendFile),
      mkdir = util.promisify(fs.mkdir),
      writeFile = util.promisify(fs.writeFile),
      readFile = util.promisify(fs.readFile);

async function insert(req, res, query) {
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d);
    if(!await exists(path.join(location, 'Tables', query.table))) 
        throw new Error("table does'nt exist");
    
    if(!await isValidStructure(query, location))
        throw new Error("invalid insert type");

    query.newRow.ID = await getAndUpdateSequence(location);
    await appendFile(path.join(location, 'Tables', query.table, 'records', 'index.txt'), JSON.stringify(query.newRow)+',\n')
    return res.json({success: true});
}

async function isValidStructure(qb, location) {
    return new Promise(async function(resolve, reject){
        const data = await readFile(path.join(location, 'Tables', qb.table, 'structure.txt'));
        const {columns} = JSON.parse(data);
        const cn = Object.keys(qb.newRow);
        for(let i=0;i<cn.length;i++)
            if(typeof columns[cn[i]] === 'undefined' 
                || typeof qb.newRow[cn[i]] != columns[cn[i]])
                return resolve(false);
        return resolve(true);
    });
}

async function getAndUpdateSequence(location) {
    return new Promise(async function(resolve, reject){
        let databaseInfo = JSON.parse(await readFile(path.join(location, 'info.txt'), 'utf8'));
        databaseInfo.sequence = parseInt(databaseInfo.sequence)
        let squence = databaseInfo.sequence++;
        await writeFile(path.join(location, 'info.txt'), JSON.stringify(databaseInfo));
        resolve(squence);
    });
}

module.exports = {
    insert,
}
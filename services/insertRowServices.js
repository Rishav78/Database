const fs = require('fs');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists),
      appendFile = util.promisify(fs.appendFile),
      mkdir = util.promisify(fs.mkdir),
      writeFile = util.promisify(fs.writeFile),
      readFile = util.promisify(fs.readFile),
      stat = util.promisify(fs.stat) ;

async function insert(req, res, query) {
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d);
    if(!await exists(path.join(location, 'Tables', query.table))) 
        throw new Error("table does'nt exist");
    
    if(!await isValidStructure(query, location))
        throw new Error("invalid insert type");

    query.newRow.ID = await getAndUpdateSequence(location);
    let filename = await getFileName(query, path.join(location,'Tables', query.table), query.newRow.ID);
    await appendFile(path.join(location, 'Tables', query.table, 'records', filename), JSON.stringify(query.newRow)+',\n')
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
        try{
            let databaseInfo = JSON.parse(await readFile(path.join(location, 'info.txt'), 'utf8'));
            databaseInfo.sequence = parseInt(databaseInfo.sequence)
            let squence = databaseInfo.sequence++;
            await writeFile(path.join(location, 'info.txt'), JSON.stringify(databaseInfo));
            resolve(squence);
        }
        catch(error) {
            console.log('here => ', await readFile(path.join(location, 'info.txt'), 'utf8'))
        }
    });
}

async function getFileName(query, location, newFile) {
    return new Promise(async function(resolve, reject){
        let active = JSON.parse(await readFile(path.join(location, 'structure.txt')));
        const status = await stat(path.join(location, 'records', `${active.active}.txt`));
        if(status.size/1000 > 6){
            active.files.push(active.active);
            active.active = newFile;
            await writeFile(path.join(location, 'structure.txt'), JSON.stringify(active));
        }
        console.log(active.active)
        resolve(`${active.active}.txt`);
    })
}

module.exports = {
    insert,
}
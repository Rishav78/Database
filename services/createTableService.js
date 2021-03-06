const fs = require('fs');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists),
      appendFile = util.promisify(fs.appendFile),
      mkdir = util.promisify(fs.mkdir),
      writeFile = util.promisify(fs.writeFile),
      readFile = util.promisify(fs.readFile) ;

const dataTypes = ['string', 'number', 'date', 'array'];

async function createTable(req, res, query){
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d, 'Tables');
    if(!await exists(location)) await mkdir(path.join(location));
    if(await exists(path.join(location,query.name)))
        throw new Error("table exists");

    let columns = Object.keys(query.columns);
    for(let i=0;i<columns.length;i++)
        if(!dataTypes.includes(query.columns[columns[i]]))
            throw new Error('Unkown datatype');
    
    await createTableDir(location, query);
    await createIndexDir(location, query);
    
    return res.json({success: true});
}

async function createIndexDir(location, query) {
    await mkdir(path.join(location, query.name, 'Indexs'));
    await writeFile(path.join(location, query.name, 'Indexs', 'id.txt'), '');
}

async function createTableDir(location, query) {
    const sequence = JSON.parse(await readFile(path.join(location, '..', 'info.txt'))).sequence;
    await mkdir(path.join(location, query.name));
    await mkdir(path.join(location, query.name, 'records'));
    await writeFile(path.join(location, query.name, 'records', `${sequence}.txt`), '');
    const {name, columns} = query;
    await writeFile(path.join(location, query.name, 'structure.txt'), JSON.stringify({name,columns, files: [], active: sequence}));
}

module.exports = {
    createTable,
}
const fs = require('fs');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists),
      appendFile = util.promisify(fs.appendFile),
      mkdir = util.promisify(fs.mkdir),
      writeFile = util.promisify(fs.writeFile);

async function createTable(req, res, query){
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d, 'Tables');
    if(!await exists(location)) await mkdir(path.join(location));
    if(await exists(path.join(location,query.name)))
        return res.json({success: false, msg: "table exists"});
    await mkdir(path.join(location, query.name));
    await writeFile(path.join(location, query.name, 'index.txt'), '');
    await writeFile(path.join(location, query.name, 'structure.txt'), JSON.stringify(query));
    return res.json({success: true});
}


module.exports = {
    createTable,
}
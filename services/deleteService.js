const fs = require('fs');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists),
      readFile = util.promisify(fs.readFile),
      appendFile = util.promisify(fs.appendFile),
      mkdir = util.promisify(fs.mkdir),
      writeFile = util.promisify(fs.writeFile);

async function del(req, res, query){
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d, 'Tables');
    console.log(query);
    if(!await exists(path.join(location, query.table)))
        throw new Error("table does'nt exist")
    await writeFile(path.join(location, query.table, 'records', 'index.txt'), '');
    return res.json({success:true});
}

module.exports = {
    del,
}
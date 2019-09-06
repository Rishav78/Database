const fs = require('fs');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists),
      appendFile = util.promisify(fs.appendFile),
      mkdir = util.promisify(fs.mkdir),
      writeFile = util.promisify(fs.writeFile);

async function insert(req, res, query) {
    const {d} = req.query;
    const location = path.join(__dirname, '..', 'Databases', d, 'Tables');
    console.log(query);
    if(!await exists(path.join(location, query.table)))
        return res.json({success: false, msg: "table does'nt exist"});
    await appendFile(path.join(location, query.table, 'index.txt'), JSON.stringify(query.newRow)+',')
    return res.json({success: true});
}

module.exports = {
    insert,
}
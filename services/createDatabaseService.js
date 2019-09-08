const fs = require('fs');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists),
      appendFile = util.promisify(fs.appendFile),
      mkdir = util.promisify(fs.mkdir),
      writeFile = util.promisify(fs.writeFile);

async function createDatabase(req, res) {
    const databasename = req.body.databasename.toLowerCase();
    const location = path.join(__dirname, '..', 'Databases', databasename);
    const info = {name: databasename, table: [], sequence: 0};
    if(await exists(location))
        return res.json({success: false, msg: "database already exist"});
    await mkdir(location);
    await writeFile(path.join(location, 'info.txt'),JSON.stringify(info));
    await appendFile(path.join(__dirname, '..', 'Databases', 'databases.txt'), JSON.stringify(info)+',\n')
    return res.redirect('/databaselist');
}

module.exports = {
    createDatabase,
}
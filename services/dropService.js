const fs = require('fs');
const path = require('path');
const util = require('util');
const exists = util.promisify(fs.exists),
      rimraf = util.promisify(require('rimraf'));

async function drop(req, res, query) {
    const {d} = req.query;
    console.log(query);
    const location = path.join(__dirname, '..', 'Databases', d);
    if(!await exists(path.join(location, 'Tables', query.table)))
        throw new Error("table does'nt exist");
    await rimraf(path.join(location, 'Tables', query.table));
    return res.json({success: true});
}

module.exports = {
    drop,
}
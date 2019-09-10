const createTable = require('./createTableService');
const createDatabase = require('./createDatabaseService');
const insert = require('./insertRowServices');
const select = require('./selectService');
const del = require('./deleteService');
const drop = require('./dropService');
const update = require('./updateService');

module.exports = {
    createDatabase,
    createTable,
    insert,
    select,
    del,
    drop,
    update,
}
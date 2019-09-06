const createTable = require('./createTableService');
const createDatabase = require('./createDatabaseService');
const insert = require('./insertRowServices');
const select = require('./selectService');

module.exports = {
    createDatabase,
    createTable,
    insert,
    select,
}
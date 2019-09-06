const services = require('../services');

function serveCreateDatabasePage(req, res) {
    res.render('createDatabase');
}

function createNewDatabase(req, res) {
    services.createDatabase.createDatabase(req, res);
}

module.exports = {
    serveCreateDatabasePage,
    createNewDatabase,
}
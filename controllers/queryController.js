const services = require('../services');
const querySolver = require('../querys/querySolver');

function serveQueryPage(req, res) {
    res.render('query');
}

function executeQuery(req, res) {
    let { query } = req.body;
    let queryObject = querySolver(query);
    if(queryObject.type === 'create') 
        services.createTable.createTable(req, res, queryObject);
    else if(queryObject.type === 'insert') 
        services.insert.insert(req, res, queryObject);
    else if(queryObject.type === 'select')
        services.select.select(req, res, queryObject);
}

module.exports = {
    serveQueryPage,
    executeQuery,
}
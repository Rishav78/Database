const services = require('../services');
const querySolver = require('../querys/querySolver');


const keywords = ['index', 'table', 'database'];

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
    else if(queryObject.type === 'delete')
        services.del.del(req, res, queryObject);
    else if(queryObject.type === 'drop')
        services.drop.drop(req, res, queryObject);
    else
        throw new Error('invalid query');
}

function isvalidCreateTableQuery(queryObject) {
    if(keywords.includes(queryObject.table))
        return false;
}

module.exports = {
    serveQueryPage,
    executeQuery,
}
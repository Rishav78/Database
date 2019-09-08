module.exports = (queryString, queryObject) => {
    const table = queryString.indexOf('table');
    if(table===-1) throw new Error('invalid query');
    queryObject.table = queryString.substr(table+5).toUpperCase().trim();
}
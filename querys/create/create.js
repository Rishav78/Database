let table = require('./table/table');

module.exports = (queryString, queryObject) => {
    let type = '', i=0;
    queryString = queryString.trim();
    // retrieve what to create
    while(queryString[i]!= ' ') type += queryString[i++];
    type = type.toLowerCase();
    queryObject[type] = 1;

    if(type === 'table') return table(queryString.substr(i), queryObject);
    else throw new Error('invalid query');
}
const create = require('./create/create');
const select = require('./select/select');
const update = require('./update/update');
const insert = require('./insert/insert');

module.exports = queryString => {
    let queryObject = {},
        i=0,
        queryType = '';

    queryString = queryString.replace(/\n/g, ' ');
    queryString = queryString.trim();

    while(queryString[i]!=' ' && i!=queryString.length) queryType += queryString[i++];
    queryType = queryType.toLowerCase();
    queryObject['type'] = queryType;

    if(queryType === 'create') create(queryString.substr(i), queryObject);
    else if(queryType === 'select') select(queryString.substr(i), queryObject);
    else if(queryType === 'update') update(queryString.substr(i), queryObject);
    else if(queryType === 'insert') insert(queryString.substr(i), queryObject);
    else throw new Error('invalid query');
    return queryObject;
};

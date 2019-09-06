module.exports = (queryString, queryObject) => {
    let dupQueryString = queryString.trim().toLowerCase();
    let index = dupQueryString.indexOf('into');
    let i = index+6, table = '',columns = '', values='';
    if(index===-1) throw new Error('invalid query');

    while(queryString[i]!== '(' && queryString[i]!== ' ') table+=queryString[i++];
    queryObject.table = table;

    i=queryString.indexOf('(')+1;
    while(queryString[i]!== ')') columns+=queryString[i++];
    columns = columns.split(',');

    queryString = queryString.substr(i+1);
    index = dupQueryString.indexOf('values');
    if(index===-1) throw new Error('invalid query');

    i=queryString.indexOf('(')+1;
    while(queryString[i]!== ')') values+=queryString[i++];
    values = values.split(',');

    let newRow = {};
    for(let j=0;j<columns.length;j++) {
        newRow[columns[j].trim()] = values[j].replace(/"/g,'').trim();
    }
    queryObject.newRow = newRow;
}
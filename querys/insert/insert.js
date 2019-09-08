module.exports = (queryString, queryObject) => {
    let dupQueryString = queryString.trim().toLowerCase();
    let index = dupQueryString.indexOf('into');
    let i = index+6, table = '',columns = '', values='';
    if(index===-1) throw new Error('invalid query');

    while(queryString[i]!== '(' && queryString[i]!== ' ') table+=queryString[i++];
    queryObject.table = table.toUpperCase();

    i=queryString.indexOf('(')+1;
    while(queryString[i]!== ')') columns+=queryString[i++];
    columns = columns.split(',');

    queryString = queryString.substr(i+1);
    index = dupQueryString.indexOf('values');
    if(index===-1) throw new Error('invalid query');

    i=queryString.indexOf('(')+1;
    while(queryString[i]!== ')') values+=queryString[i++];
    values = values.split(',');

    if(values.length!=columns.length)
        throw new Error('invalid number of arguments');

    let newRow = {};
    for(let j=0;j<columns.length;j++) {
        let value = convertDatatype(values[j].trim());
        let column = columns[j].trim().toUpperCase();
        newRow[column] = value;
    }
    queryObject.newRow = newRow;
}


function convertDatatype(value) {
    if(value === 'null')
        return null;
    else if(value[0] === '"')
        return value.replace(/"/g, '');
    else if(value[0] === '{')
        return JSON.parse(value);
    else if(value[0] === '[') 
        return JSON.parse(`{array: ${value}}`).array;
    else 
        return parseInt(value);
}
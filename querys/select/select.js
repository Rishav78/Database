const join = require('./join/join');

module.exports = (queryString, queryObject) => {
    const dupQueryString = queryString.toLowerCase();
    let i = dupQueryString.toLowerCase().indexOf('from');
    if(i===-1) throw new Error('invalid query');
    let selectedColumns = queryString.substring(0, i);
    selectedColumns = selectedColumns.trim();
    selectedColumns = selectedColumns === '*' ? [] : selectedColumns.split(',');

    for(let j=0;j<selectedColumns.length;j++)
        selectedColumns[j] = selectedColumns[j].trim();
    queryObject.selectedColumns = selectedColumns;

    let table = '';i=i+5;
    while(queryString[i]!=' ' && i<queryString.length) table += queryString[i++];
    queryObject.table = table.toUpperCase().trim();

    i = dupQueryString.indexOf('join');
    if(i!==-1)
        join(queryString.substr(i+4), queryObject);
    
}
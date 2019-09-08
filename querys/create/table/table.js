module.exports = (queryString, queryObject) => {
    let name = '', i=0;
    queryString = queryString.trim();

    while(queryString[i]!= ' ' && queryString[i]!= '(') name += queryString[i++];
    queryObject['name'] = name.toUpperCase();

    queryString = queryString.substring(queryString.indexOf('(')+1, queryString.lastIndexOf(')'));

    let variables = queryString.split(', ');
    let columns = {};

    for(let j=0;j<variables.length;j++) {
        let column = variables[j].split(' ');
        if(column.length!==2) throw new Error('invalid query');
        const cn = column[0].replace(/"/g,'').toUpperCase(),
            ct = column[1].toLowerCase();
        columns[cn] = ct;
    }
    queryObject['columns'] = columns;
}
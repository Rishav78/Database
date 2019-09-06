module.exports = (queryString, queryObject) => {
    let name = '', 
        i=0;
    queryString = queryString.trim();

    while(queryString[i]!= ' ' && queryString[i]!= '(') name += queryString[i++];
    queryObject['name'] = name.toLowerCase();

    queryString = queryString.substring(queryString.indexOf('(')+1, queryString.lastIndexOf(')'));

    let variables = queryString.split(', ');
    let columns = [];

    for(let j=0;j<variables.length;j++) {
        let column = variables[j].split(' ');
        columns.push({
            name: column[0],
            type: column[1],
        });
    }
    queryObject['columns'] = columns;
}
module.exports = (queryString, queryObject) => {
    let i=0, 
        name='';
    let dupQueryString = queryString.toLowerCase().trim();
    while(dupQueryString[i] !==' ') name += dupQueryString[i++];
    queryObject.table = name.toUpperCase();

    let set = dupQueryString.indexOf('set');
    let where = dupQueryString.indexOf('where');
    if(set === -1) throw new Error('invalid query');
    let newValues = queryString.substring(set+4, where!=-1 ? where : queryString.length).trim();
    newValues = newValues.split(', ');
    let columns = [];
    for(let i=0;i<newValues.length;i++) {
        let column = newValues[i].split('=');
        columns.push({
            column: column[0].trim().toUpperCase(),
            value: convertDatatype(column[1].trim()),
        })
    }
    queryObject.newValues = columns;
    // if(where!=-1){

    // }
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
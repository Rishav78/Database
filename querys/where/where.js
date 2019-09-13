module.exports = (queryString, queryObject) => {
    let dupQueryString = queryString.toLowerCase();
    let condition = queryString.split('=');
    let where = {
        [condition[0].toUpperCase().trim()]: convertDatatype(condition[1].trim()),
    }
    queryObject.where = where;
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
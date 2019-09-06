module.exports = (queryString, queryObject) => {
    let i=0, 
        name='';
    let dupQueryString = queryString.toLowerCase().trim();
    while(dupQueryString[i] !==' ') name += dupQueryString[i++];
    queryObject.table = name;

    let set = dupQueryString.indexOf('set');
    let where = dupQueryString.indexOf('where');
    if(set === -1) throw new Error('invalid query');
    let newValues = queryString.substring(set+4, where!=-1 ? where : queryString.length).trim();
    newValues = newValues.split(', ');
    let columns = [];
    for(let i=0;i<newValues.length;i++) {
        let column = newValues[i].split('=');
        columns.push({
            column: column[0].trim(),
            value: column[1].trim(),
        })
    }
    queryObject.newValues = columns;
    // if(where!=-1){

    // }
}
module.exports = (queryString, queryObject) => {
    let end = queryString.toLowerCase().indexOf('from');
    if(end===-1) throw new Error('invalid query');
    let selectedColumns = queryString.substring(0, end);
    selectedColumns = selectedColumns.trim();
    selectedColumns = selectedColumns === '*' ? [] : selectedColumns.split(',');
    for(let i=0;i<selectedColumns.length;i++)
        selectedColumns[i] = selectedColumns[i].trim();
    queryObject.selectedColumns = selectedColumns;
    queryObject.table = queryString.substr(end+5).trim();
}
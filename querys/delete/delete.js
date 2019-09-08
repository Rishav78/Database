module.exports = (queryString, queryObject) => {
    let dupQueryString = queryString.toLowerCase();
    const from = dupQueryString.indexOf('from');
    if(from===-1) throw new Error('from statement expected');
    queryObject.table = dupQueryString.substr(from+4).toUpperCase().trim();
}
module.exports = (queryString, queryObject) => {
    let dupQueryString = queryObject.toLowerCase();
    let where = [];
    let condition = dupQueryString.indexOf('or') || dupQueryString.indexOf('and');
    while(condition!=-1){
        where.push(dupQueryString.substring(0, condition));
        dupQueryString = su
    }

}
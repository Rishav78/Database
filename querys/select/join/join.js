module.exports = (queryString, queryObject) => {
    queryString = queryString.trim();
    queryObject.join = {};
    let dupQueryString = queryString.toLowerCase(),
        i = 0;
    let table = '';
    while(dupQueryString[i]!=' ') table += dupQueryString[i++];
    queryObject.join.table = table.toUpperCase();
    i = dupQueryString.indexOf('on');
    if(i===-1) throw new Error('on expected');
    queryObject.join.on = {};
    let on = queryString.substr(i+2).split('=');
    for(let j=0;j<on.length;j++){
        let kv = on[j].trim().split('.'),
            k = kv[0].toUpperCase(),
            v = kv[1].toUpperCase();
        queryObject.join.on[k] = v;
    }
}
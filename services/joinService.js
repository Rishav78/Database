let records = [];
const query = JSON.parse(process.argv[4]);

const tables = {
    [query.table]: JSON.parse(process.argv[2]).records,
    [query.join.table]: JSON.parse(process.argv[3]).records,
};

let tj1 = query.join.on[query.table];
let tj2 = query.join.on[query.join.table];


for(let i=0;i<tables[query.table].length;i++) {
    for(let j=0;j<tables[query.join.table].length;j++)
        if(tables[query.table][i][tj1] == tables[query.join.table][j][tj2]){
            records.push({
                ...tables[query.table][i],
                ...tables[query.join.table][j],
            });
    }
}

console.log(JSON.stringify({records}));
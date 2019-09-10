(async function(){
    const {readRecords} = require('../readRecordsService');
    const {newValues} = JSON.parse(process.argv[3]);
    let location = process.argv[2];
    let {records} = JSON.parse(await readRecords(location));
    for(let i=0;i<records.length;i++){
        for(let j=0;j<newValues.length;j++) {
            const {column, value} = newValues[j];
            records[i][column] = value;
        }
    }
    console.log(JSON.stringify(records));
})();
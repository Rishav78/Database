const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cluster = require('cluster'),
    session = require('express-session'),
    cpu = require('os').cpus().length;
    port = 4000;


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(cluster.isMaster) {
    for(let i=0;i<cpu;i++)
        cluster.fork();
}else{
    app.use('/', require('./routes'));
    app.listen(port,err => {
        if(err) throw err;
        console.log(`listening on port ${port}`);
    });
}
const router = require('express').Router();
const createDatabase = require('./createDatabaseRoute');
const databaseList = require('./databaseListRoute');

router.use('/query', require('./queryRoute'));
router.use('/createdatabase', require('./createDatabaseRoute'));
router.use('/databaselist', require('./databaseListRoute'));

module.exports = router;
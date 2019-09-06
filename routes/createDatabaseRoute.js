const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.createDatabase.serveCreateDatabasePage);
router.post('/', controllers.createDatabase.createNewDatabase);

module.exports = router;
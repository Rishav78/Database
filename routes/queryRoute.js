const router = require('express').Router(),
    controllers = require('../controllers');

router.get('/', controllers.query.serveQueryPage);
router.post('/', controllers.query.executeQuery);


module.exports = router;
var express = require('express');
var router = express.Router();
var _ = require('underscore');

var path = require('path');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    console.log('Time: ', Date.now());
    next();
});

router = require('./exercise')(router);
router = require('./user')(router);
router = require('./testpic')(router);
module.exports = router;


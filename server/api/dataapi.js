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

console.log('test router');
router = require('./exercise')(router);
module.exports = router;


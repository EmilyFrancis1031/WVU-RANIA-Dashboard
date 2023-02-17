var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RANIA Dashboard Login' });
});

module.exports = router;

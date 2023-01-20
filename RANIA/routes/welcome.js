var express = require('express');
var router = express.Router();

var path = require("path");
var wp = path.join("Welcome_Page", "welcome")

/* GET welcome page. */
router.get('/', function(req, res, next) {
  res.render('Welcome_Page/welcome', { title: 'RANIA Dashboard' });
});

module.exports = router;

var express = require('express');
var router = express.Router();

var path = require("path");
var sp = path.join("Settings", "settings")

/* GET welcome page. */
router.get('/', function(req, res, next) {
  res.render(sp, { title: 'RANIA' });
});

module.exports = router;

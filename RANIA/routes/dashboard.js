var express = require('express');
var router = express.Router();

var path = require("path");
var dbp = path.join("Dashboard", "dashboard")

/* GET welcome page. */
router.get('/', function(req, res, next) {
  res.render(dbp, { title: 'RANIA - Dashboard' });
});

module.exports = router;
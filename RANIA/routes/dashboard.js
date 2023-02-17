var express = require('express');
var router = express.Router();

var path = require("path");
var dbp = path.join("Dashboard", "dashboard")

/* GET dashboard page. */
router.get('/', function(req, res, next) {
  res.render(dbp, { title: 'RANIA - Dashboard' });
});

router.get('/devices', (req, res) => {
  res.send('Device List');
});

module.exports = router;
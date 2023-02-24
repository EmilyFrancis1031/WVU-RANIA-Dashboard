var express = require('express');
var router = express.Router();

var path = require("path");
var dbp = path.join("Dashboard", "dashboard")
var dbpWizard = path.join("Wizards", "devices", "devices")

/* GET dashboard page. */
router.get('/', function (req, res, next) {
  res.render(dbp, { title: 'RANIA - Dashboard' });
});

router.get('/wizards/devices', (req, res) => {
  res.render(dbpWizard, { title: 'Devices List' });
});

module.exports = router;
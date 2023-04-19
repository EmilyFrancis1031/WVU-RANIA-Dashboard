var express = require('express');
var router = express.Router();

var path = require("path");
var dbp = path.join("Dashboard", "dashboard")
var dbpWizard = path.join("Wizards", "devices", "devices")

/* GET dashboard page. */
router.get('/', function (req, res, next) {
  res.render(dbp, { title: 'RANIA - Dashboard' });
});
const devices = db.get('devices').value();

router.get('/', function(req, res) {
  // Render the dashboard view with the devices variable
  res.render('dashboard', { devices });
});

router.get('/device/:id', function(req, res) {
  const deviceId = req.params.id;
  // Query the database for information about the specified device
  const deviceInfo = db.get(`devices[${deviceId}]`).value();
  // Render the device status view with the retrieved information
  res.render('device_status', { deviceInfo });
});

module.exports = router;

var express = require('express');
var router = express.Router();

var path = require("path");
var dbp = path.join("Dashboard", "dashboard")
var dbpWizard = path.join("Wizards", "devices", "devices")

var receive_data = require('../scripts/receive_data');

var connect_device = require("../scripts/data_scripts/connect_device")
var create_database = require("../scripts/data_scripts/create_database")
var destroy_database = require("../scripts/data_scripts/destroy_database")
var disconnect_device = require("../scripts/data_scripts/disconnect_device")
var get_data = require("../scripts/data_scripts/get_data")
var insert_data = require("../scripts/data_scripts/insert_data")
var remove_data = require("../scripts/data_scripts/remove_data")
var update_data = require("../scripts/data_scripts/update_data")


/* Process Data. */
router.get('/', function (req, res, next) {
  res.send("Data Help");
});

/* Connect Device */
router.get('/connect-device', function (req, res, next) {
  var result = receive_data(req.body, connect_device)
  res.send(result);
});

/* Create Database */
router.get('/create-database', function (req, res, next) {
  var result = receive_data(req.body, create_database)
  res.send(result);
});

/* Destroy Database */
router.get('/destroy-database', function (req, res, next) {
  var result = receive_data(req.body, destroy_database)
  res.send(result);
});

/* Disconnect Device */
router.get('/disconnect-device', function (req, res, next) {
  var result = receive_data(req.body, disconnect_device)
  res.send(result);
});

/* Get Data */
router.get('/get-data', function (req, res, next) {
  //console.log(req.body)
  var result = receive_data(req.body, get_data)
  res.send(result);
});

/* Inset Data */
router.get('/insert-data', function (req, res, next) {
  var result = receive_data(req.body, insert_data)
  res.send(result);
});

/* Remove Data */
router.get('/remove-data', function (req, res, next) {
  var result = receive_data(req.body, remove_data)
  res.send(result);
});

/* Update Data */
router.get('/update-data', function (req, res, next) {
  var result = receive_data(req.body, update_data)
  res.send(result);
});


module.exports = router;
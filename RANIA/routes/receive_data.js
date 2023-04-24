var express = require("express");
var router = express.Router();

var path = require("path");
var dbp = path.join("Dashboard", "dashboard");
var dbpWizard = path.join("Wizards", "devices", "devices");

var receive_data = require("../scripts/receive_data");

var connect_device = require("../scripts/data_scripts/connect_device");
var create_database = require("../scripts/data_scripts/create_database");
var destroy_database = require("../scripts/data_scripts/destroy_database");
var disconnect_device = require("../scripts/data_scripts/disconnect_device");
var get_data = require("../scripts/data_scripts/get_data");
var insert_data = require("../scripts/data_scripts/insert_data");
var remove_data = require("../scripts/data_scripts/remove_data");
var update_data = require("../scripts/data_scripts/update_data");

/* Process Data. */
router.get("/", async function (req, res, next) {
  res.json("Data Help");
});

/* Connect Device */
router.get("/connect-device", async function (req, res, next) {
  var result = await receive_data(req.body, connect_device);
  res.json(result);
});

/* Create Database */
router.post("/create-database", async function (req, res, next) {
  var result = await receive_data(req.body, create_database);
  res.json(result);
});

/* Destroy Database */
router.post("/destroy-database", async function (req, res, next) {
  var result = await receive_data(req.body, destroy_database);
  res.json(result);
});

/* Disconnect Device */
router.post("/disconnect-device", async function (req, res, next) {
  var result = await receive_data(req.body, disconnect_device);
  res.json(result);
});

/* Get Data */
router.get("/get-data", async function (req, res, next) {
  //console.log(req.body)
  var result = await receive_data(req.body, get_data);
  console.log("[route result]: ", result);
  res.json(result);
});

/* Insert Data */
router.post("/insert-data", async function (req, res, next) {
  console.log(req.body);
  var result = await receive_data(req.body, insert_data);
  console.log(result);
  res.json(result);
});

/* Remove Data */
router.post("/remove-data", async function (req, res, next) {
  var result = await receive_data(req.body, remove_data);
  console.log(result);
  res.json(result);
});

/* Update Data */
router.post("/update-data", async function (req, res, next) {
  var result = await receive_data(req.body, update_data);
  res.json(result);
});

module.exports = router;

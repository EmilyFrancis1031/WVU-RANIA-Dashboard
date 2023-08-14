var express = require("express");
var router = express.Router();
const WebSocket = require('ws');
var path = require("path");
var dbp = path.join("Dashboard", "dashboard");
var dbpWizard = path.join("Wizards", "devices", "devices");

var receive_data = require("../scripts/receive_data");

var append_data = require("../scripts/data_scripts/append_data");
var connect_device = require("../scripts/data_scripts/connect_device");
var create_database = require("../scripts/data_scripts/create_database");
var destroy_database = require("../scripts/data_scripts/destroy_database");
var disconnect_device = require("../scripts/data_scripts/disconnect_device");
var get_data = require("../scripts/data_scripts/get_data");
var upsert_data = require("../scripts/data_scripts/upsert_data");
var remove_data = require("../scripts/data_scripts/remove_data");

// Middleware to set wss as a property of the router object
router.use(function(req, res, next) {
  // Access the wss instance from the request's app.locals (assuming it's set there)
  // Alternatively, you can access wss directly if it's in the same scope as this routes file
  router.wss = req.app.locals.wss;
  router.active_device = req.app.locals.active_device;
  next();
});

/* Process Data. */
router.get("/", async function (req, res, next) {
  res.json("Data Help");
});

/* Connect Device */
router.post("/connect-device", async function (req, res, next) {
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
router.post("/get-data", async function (req, res, next) {
  //console.log(req.body)
  var result = await receive_data(req.body, get_data);
  //console.log("[route result]: ", result);
  res.json(result);
});

/* Insert Data */
router.post("/upsert-data", async function (req, res, next) {
  //console.log(req.body);
  var result = await receive_data(req.body, upsert_data);
  console.log(result);
  res.json(result);
  console.log("[router.active_device]: ", router.active_device)
  if (router.wss && router.wss.clients && req.body.data.db_name == router.active_device) {
    // console.log("router.wss && router.wss.clients")
    router.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        // console.log("client.readyState === WebSocket.OPEN")
        client.send(JSON.stringify(req.body));
      }
    });
  }
});

/* Append Data */
router.post("/append-data", async function (req, res, next) {
  //console.log(req.body);
  var result = await receive_data(req.body, append_data);
  console.log(result);
  res.json(result);
  console.log("[router.active_device]: ", router.active_device)
  if (router.wss && router.wss.clients && req.body.data.db_name == router.active_device) {
    // console.log("router.wss && router.wss.clients")
    router.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        // console.log("client.readyState === WebSocket.OPEN")
        client.send(JSON.stringify(req.body));
      }
    });
  }
});

/* Remove Data */
router.post("/remove-data", async function (req, res, next) {
  var result = await receive_data(req.body, remove_data);
  console.log(result);
  res.json(result);
});

module.exports = router;

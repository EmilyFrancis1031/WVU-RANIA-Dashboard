var express = require("express");
var router = express.Router();

var path = require("path");
var sp = path.join("Settings", "settings");

/* GET settings page. */
router.get("/", function (req, res, next) {
  res.render(sp, { title: "RANIA - Settings" });
});

router.get("/edit/AddDevice", (req, res) => {
  res.send("Please select a visible device to add:");
});

router.get("/edit/DeleteDevice", (req, res) => {
  res.send("Please select a visible device to delete:");
});

router.get("/edit/Devices", (req, res) => {
  res.send("Which of these devices would you like to make changes to?");
});

router.get("/edit/Resident", (req, res) => {
  res.send("What would you like to change about the resident?");
});

router.get("/edit/Contact", (req, res) => {
  res.send("What contact information would you like to change?");
});

router.get("/export", (req, res) => {
  res.send("What data would you like exported?");
});

module.exports = router;

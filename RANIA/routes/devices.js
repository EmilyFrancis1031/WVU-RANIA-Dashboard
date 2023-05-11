var express = require("express");
var router = express.Router();

var path = require("path");
var ap = path.join("Devices", "devices");
/* GET agenda page. */
router.get("/", function (req, res, next) {
  res.render(ap, { title: "RANIA - Resident Devices" });
});

router.get("/modify", (req, res) => {
  res.send("Ability to modify devices");
});

module.exports = router;

var express = require("express");
var router = express.Router();

var path = require("path");
var ap = path.join("Medical", "Medical");
/* GET agenda page. */
router.get("/", function (req, res, next) {
  res.render(ap, { title: "RANIA - Resident Medical Conditions" });
});

router.get("/modify", (req, res) => {
  res.send("Ability to modify medical conditions");
});

module.exports = router;

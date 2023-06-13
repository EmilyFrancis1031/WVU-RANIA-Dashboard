var express = require("express");
var router = express.Router();

var path = require("path");
var ap = path.join("Medications", "medications");
/* GET agenda page. */
router.get("/", function (req, res, next) {
  res.render(ap, { title: "RANIA - Resident Medications" });
});

router.get("/modify", (req, res) => {
  res.send("Ability to modify medications");
});

module.exports = router;

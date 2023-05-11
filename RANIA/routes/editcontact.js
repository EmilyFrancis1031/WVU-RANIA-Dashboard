var express = require("express");
var router = express.Router();

var path = require("path");
var ap = path.join("Contacts", "contacts");
/* GET agenda page. */
router.get("/", function (req, res, next) {
  res.render(ap, { title: "RANIA - Resident Contacts" });
});

router.get("/modify", (req, res) => {
  res.send("Ability to modify contacts");
});

module.exports = router;

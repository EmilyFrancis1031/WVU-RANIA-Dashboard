var express = require('express');
var router = express.Router();

var path = require("path");
var ap = path.join("Agenda", "agenda")

/* GET welcome page. */
router.get('/', function(req, res, next) {
  res.render(ap, { title: 'RANIA - Resident Agenda' });
});

module.exports = router;
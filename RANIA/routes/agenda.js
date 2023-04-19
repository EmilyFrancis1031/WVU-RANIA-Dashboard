var express = require('express');
var router = express.Router();

var path = require("path");
var ap = path.join("Agenda", "agenda")

/* GET agenda page. */
router.get('/', function(req, res, next) {
  res.render(ap, { title: 'RANIA - Resident Agenda' });
});

router.get('/modify', (req, res) => {
  res.send('Ability to modify agenda');
});

module.exports = router;
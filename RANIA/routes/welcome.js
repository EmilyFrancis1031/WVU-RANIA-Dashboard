var express = require('express');
var router = express.Router();

/* GET welcome page. */
router.get('/welcome', function(req, res, next) {
  res.render('/welcome', { title: 'RANIA Dashboard' });
});

module.exports = router;

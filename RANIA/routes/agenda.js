var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var TinyDB = require('tinydb');
var path = require("path");
var ap = path.join("Agenda", "agenda");
var insert_data = require("../scripts/data_scripts/insert_data");


// Initialize TinyDB
var db = new TinyDB('./db.json');

// Set up body-parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/* GET agenda page. */
router.get('/', async function(req, res, next) {
  const events = await db.gethAll('calendar_events') || [];
  res.render(ap, { title: 'RANIA - Resident Agenda', events });
});

router.get('/modify', (req, res) => {
  res.send('Ability to modify agenda');
});

router.post('/add-event', async function(req, res, next) {
  const title = req.body.eventTitle;
  const date = req.body.eventDate;
  const time = req.body.eventTime;
  const event = { title, date, time };

  const result = await insert_data({ data: { k: title, v: event }, db: 'calendar_events' });
  if (result === 301) {
    res.status(500).send('Failed to insert data');
  } else {
    res.redirect('/agenda');
  }
});

router.post('/remove-event', async function(req, res, next) {
  const title = req.body.eventTitle;
  const date = req.body.eventDate;
  const time = req.body.eventTime;
  const event = { title, date, time };

  const dbResult = await new Promise((resolve) => {
    db.onReady = function () {
      db.getInfo(title, function (err, value) {
        if (err) {
          console.log(err);
          return;
        }
        if (value == null) {
          console.log(`[getInfo] No value found for ${title}`);
          resolve(null);
        } else {
          console.log(`[getInfo] ${title}: ${value}`);
          db.removeInfo(title, function (err) {
            if (err) {
              console.log(err);
              resolve(null);
            } else {
              console.log(`[removeInfo] ${title}`);
              resolve(value);
            }
          });
        }
      });
    };
  });

  if (dbResult == null) {
    res.status(500).send('Failed to remove data');
  } else {
    res.redirect('/agenda');
  }
});

module.exports = router;

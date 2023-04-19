const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const TinyDB = require('tinydb');
const path = require('path');

// Initialize TinyDB
const db = new TinyDB('./db.json');

// Set up body-parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// GET agenda page
router.get('/', async (req, res, next) => {
  const events = await db.fetchAll('calendar_events') || [];
  res.render('Agenda/agenda', { title: 'RANIA - Resident Agenda', events });
});

// POST add event
router.post('/add', async (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;

  const event = { title, date, time };

  await db.insert('calendar_events', event);

  res.redirect('/agenda');
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const TinyDB = require('tinydb');
const path = require('path');
const app = express();

app.get('/dashboard', async (req, res) => {
    const events = await db.fetchAll('calendar_events') || [];
    res.render('Dashboard/dashboard', { events });
  });
  
// Set up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up view engine (Pug)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Initialize TinyDB
const db = new TinyDB('./db.json');

// Get calendar events
app.get('/agenda', async (req, res) => {
  const events = await db.fetchAll('calendar_events') || [];
  res.render('agenda', { events });
});

// Handle form submission for adding a new calendar event
app.post('/agenda/add', async (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;

  const event = { title, date, time };

  await db.insert('calendar_events', event);

  res.redirect('/agenda');
});

// Handle form submission for removing a calendar event
app.post('/agenda/remove', async (req, res) => {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;

  await db.remove('calendar_events', { title, date, time });

  res.redirect('/agenda');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

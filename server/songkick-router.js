let express = require('express');
let router = express.Router();
let axios = require('axios');
let apiKey = process.env.SONGKICK_KEY;
let bodyParser = require('body-parser');
let db = require('../database/index.js');
let async = require('async');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', (req, res) => {
  let date = req.body.date;
  let lat = req.body.lat;
  let lng = req.body.lng;
  let city = req.body.city;
  let url = `http://api.songkick.com/api/3.0/events.json?apikey=${apiKey}&location=geo:${lat},${lng}&min_date=${date}&max_date=${date}`;

  axios.get(url)
  .then((events) => {
    //searchCity is either the city searched by user, or defaults to
    //San Francisco, since that is what renders automatically on
    //component mount.
    let searchCity = city || 'San Francisco, CA, United States';
    let data = events.data.resultsPage.results.event;
    return data.map((event) => ({
      displayName: event.displayName,
      headline: event.performance[0].displayName,
      uri: event.uri,
      time: event.start.time,
      date: event.start.date,
      venue: event.venue.displayName,
      latitude: event.location.lat,
      longitude: event.location.lng,
      city: event.location.city,
      metroArea: event.venue.metroArea.displayName,
      popularity:event.popularity,
      searchCity: searchCity
    }))
  })
  .then(events => {
    res.send(events);
});

module.exports = router;

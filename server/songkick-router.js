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
  //
  // db.getMetroArea(city)
  // .then((data) => {
  //   if (data === undefined) {
  //     console.log('happy happy fun time');
  //     axios.get(url)
  //     .then((events) => {
  //       let searchCity = city || 'San Francisco, CA, United States';
  //       console.log('THE CITY', searchCity);
  //       let data = events.data.resultsPage.results.event;
  //       async.each(data, (event, callback) => {
  //         db.createEvent(event, searchCity);
  //         console.log('events', event);
  //       })
  //       res.send(data);
  //     })
  //   }
  // })
  // .catch((error) => {
  //   console.log('nonono');
  // })
  //




  axios.get(url)
  .then((events) => {
    //searchCity is either the city searched by user, or defaults to
    //San Francisco, since that is what renders automatically on
    //component mount.
    let searchCity = city || 'San Francisco, CA, United States';
    let data = events.data.resultsPage.results.event;
    async.each(data, (event, callback) => {

      db.createEvent(event, searchCity);
      console.log('event saved: ', event);
    })
    res.send(data);
  });
});

module.exports = router;

const Sequelize = require('sequelize');
// const credentials = require('./config/js');
// let user = credentials.login

const seq = new Sequelize(process.env.DATABASE_NAME, process.env.DATABESE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABSE_HOST,
  dialect: 'mysql',
  logging: false
});

const Events = seq.define('events', {
  displayName: Sequelize.STRING,
  headline: Sequelize.STRING,
  uri: Sequelize.STRING,
  time: Sequelize.STRING,
  date: Sequelize.STRING,
  venue: Sequelize.STRING,
  latitude: Sequelize.STRING,
  longitude: Sequelize.STRING,
  city: Sequelize.STRING,
  metroArea: Sequelize.STRING,
  searchCity: Sequelize.STRING,
  popularity: Sequelize.INTEGER
});

seq
  .authenticate()
  .then(() => {
    console.log('connection granted');
  })
  .catch(err => {
    console.log('error connecting to DB ', err);
  });

let getMetroArea = (city) => {
  return Events.findOne({
    where: {
      searchCity: city
    },
    raw: true
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log('error retrieving metroArea', error);
  });
}
let createEvent = (event, searchCity) => {
  return Events.create({
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
    popularity: event.popularity,
    searchCity: searchCity
  });
}
let getEvents = (date, lat, lng, callback) => {
  return Events.findAll({
    where: {
      date: date
    },
    raw: true
  })
  .then((data) => {
    callback(data);
  })
  .catch((error) => {
    console.log("Error getting events: ", error);
  })
};

module.exports.createEvent = createEvent;
module.exports.getEvents = getEvents;
module.exports.getMetroArea = getMetroArea;

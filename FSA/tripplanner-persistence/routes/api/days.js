var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

//Get specific day
router.get('/:id', function(req, res, next) {
  console.log('looking for day with id:', req.params.id);
  Day.findById(req.params.id)
    .then(function(day) {
      console.log('found day!', day);
      res.send(day);
    })
    .catch(next);
});

//Get all days
router.get('/', function(req, res, next) {
  console.log('in /api/days');
  Day.findAll()
    .then((dayArray) => {
      console.log('days found!');
      console.log('sending dayArray', dayArray);
      res.send(dayArray);
    })
    .catch(next);
});


//Delete specific day
router.delete('/all', function(req, res, next) {
  res.send('Days All');
});

//Create day
router.post('/', function(req, res, next) {
  Day.findOrCreate({
      where: {
        number: +req.body.number
      }
    })
    .spread((day, wasCreated) => {
      if (wasCreated) {
        console.log('New Day created!');
      } else {
        console.log('Day found, not created!');
      }
      res.send(day);
    })
    .catch(next)
});

//Update a day
router.put('/', function(req, res, next) {
  var activities = req.body.activities;
  var hotel = req.body.hotel;
  var restaurants = req.body.restaurants;
  var dayId = +req.body.number;
  console.log('updating day with', activities, hotel, restaurants);


  Day.findById(dayId)
    .then(function(day) {
      var settingHotel = day.setHotel(hotel);
      var settingRestaurants = day.addRestaurants(restaurants);
      var settingActivities = day.addActivities(activities);

      return Promise.all([settingHotel, settingRestaurants,
        settingActivities
      ]);
    })
    .spread(function(hotel, restaurants, activities) {
      console.log('Added Hotel, Restaurants, Activities');
    })
    .catch(next);
});

//Set Hotel
router.put('/:id/hotel', function(req, res, next) {
  Day.findById(req.params.id)
    .then(function(day) {
      return day.setHotel(req.body.attractionId);
    })
    .then(function() {
      console.log('Added hotel!');
      console.log('successfully added hotel to day: ' + req.params.id);
      res.send('added hotel');
    })
    .catch(next);
});

//Get Hotel
router.get('/:id/hotel', function(req, res, next) {
  Day.findById(req.params.id)
    .then(function(day) {
      // var hotel = day.getHotel();
      // console.log('Found Hotel!', hotel);
      return day.getHotel();
    })
    .then(function(hotel) {
      console.log('Found Hotel!', hotel);
      res.send(hotel);
    })
    .catch(next);
});

router.put('/:id/activity', function(req, res, next) {
  Day.findById(req.params.id)
    .then(function(day) {
      return day.addActivity(req.body.attractionId);
    })
    .then(function() {
      res.send('added activity');
    })
    .catch(next);
});

router.put('/:id/restaurant', function(req, res, next) {
  Day.findById(req.params.id)
    .then(function(day) {
      return day.addRestaurant(req.body.attractionId);
    })
    .then(function() {
      res.send('added restaurant');
    })
    .catch(next);
});

module.exports = router;

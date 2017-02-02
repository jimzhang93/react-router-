var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Day = require('../models/day');

router.get('/', function(req, res, next) {
  Promise.all([
      Hotel.findAll(),
      Restaurant.findAll(),
      Activity.findAll(),
      Day.findAll()
      //promise to get days
    ])
    .spread(function(dbHotels, dbRestaurants, dbActivities, dbDays) {
      res.render('index', {
        templateHotels: dbHotels,
        templateRestaurants: dbRestaurants,
        templateActivities: dbActivities
      });
    })
    .catch(next);
});

module.exports = router;

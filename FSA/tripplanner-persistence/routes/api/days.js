var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

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

//Get specific day
router.get('/:id', function(req, res, next) {
  res.send('Days All');
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
  Day.update({
      //values
      number: +req.body.number
    }, {
      //options
      where: {
        number: +req.body.number
      }
    })
    .spread((affectedCount, affectedRows) => {
      console.log()
      if (affectedRows) {
        console.log('updated day successfully!');
        let day = affectedRows[0];
      } else {
        console.log('nothing was updated!');
      }
    })
    .catch(next);
});



module.exports = router;

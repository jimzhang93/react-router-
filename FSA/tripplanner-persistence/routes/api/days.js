var express = require('express');
var router = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

//Get all days
router.get('/', function(req,res,next){
  res.send('Days All');
});

//Get specific day
router.get('/:id', function(req,res,next){
  res.send('Days All');
});

//Delete specific day
router.delete('/all', function(req,res,next){
  res.send('Days All');
});

//Create day
router.post('/', function(req,res,next){
  // Day.create({number: req.body.})
  console.log(req.body);
  res.send('Days All');
});


module.exports = router;

/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./place');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  // setterMethods: {
  //   set: function(day) {
  //     day.number = day.id;
  //   }
  // }
});



module.exports = Day;

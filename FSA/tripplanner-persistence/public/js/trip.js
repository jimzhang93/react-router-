'use strict';
/* global $ dayModule  controllerModule*/

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function() {

  // application state

  var days = [],
    currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function() {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo(newCurrentDay) {
    //save current day
    console.log('saving current day', currentDay);
    if (currentDay) {
      currentDay.hide();
      controllerModule.saveDayDB(currentDay)
        .then(function(successObj) {
          console.log('Successfully saved current day', currentDay);
          res.send(successObj);
        })
        .catch(console.error) //this is a promise
    } else {
      console.log('not current day');
      res.send({
        message: 'nothing updated'
      });
    }
    console.log('after if else loop');
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function() {
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });

  function addDay() {
    if (this && this.blur) this.blur(); // removes focus box from buttons
    console.log('Creating New Day with days array length: ', days.length);
    var newDay = dayModule.create({
      number: days.length + 1
    }); // dayModule
    //add day to database
    //find day with number if none exists, add to db, else

    controllerModule.addDayDB(newDay)
      .then(function(newDay) {
        console.log('added newDay to DB: ', newDay);
      })
      .catch(console.error);
    days.push(newDay);
    if (days.length === 1) {
      currentDay = newDay;
    }
    switchTo(newDay);
  }

  function deleteCurrentDay() {
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
    // fix the remaining day numbers
    days.forEach(function(day, i) {
      day.setNumber(i + 1);
    });
    switchTo(newCurrent);
    previousDay.hideButton();
  }

  // globally accessible module methods

  var publicAPI = {

    load: function() {

      // Load Days
      console.log('LOAD CALLED');
      $.get('/api/days')
        .then(function(daysFromDb) {
          daysFromDb.forEach(function() {
            addDay();
          });
        })
        .catch(console.err);
    },

    switchTo: switchTo,

    addToCurrent: function(attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function(attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return publicAPI;

}());
